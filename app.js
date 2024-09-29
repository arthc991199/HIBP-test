document.getElementById('passwordForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('result');

    const sha1Hash = await sha1(password);
    const prefix = sha1Hash.slice(0, 5).toUpperCase();
    const suffix = sha1Hash.slice(5).toUpperCase();

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();

    const breaches = data.split('\n').map(line => {
        const [hashSuffix, count] = line.split(':');
        return { hashSuffix: hashSuffix.trim(), count: parseInt(count.trim()) };
    });

    const breach = breaches.find(b => b.hashSuffix === suffix);

    if (breach) {
        resultDiv.textContent = `To hasło było uźyte ${breach.count} razy.`;
        resultDiv.style.color = 'red';
    } else {
        resultDiv.textContent = 'To hasło nie było jeszcze uźywane';
        resultDiv.style.color = 'green';
    }
});

async function sha1(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
