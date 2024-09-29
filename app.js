document.getElementById('passwordForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('result');
    
    console.log('Wprowadzone hasło:', password); // Debug hasła

    if (!password) {
        resultDiv.textContent = 'Proszę wprowadzić hasło.';
        resultDiv.style.color = 'red';
        return;
    }

    try {
        // Oblicz SHA-1 hasła
        const sha1Hash = await sha1(password);
        console.log('SHA-1 Hash:', sha1Hash); // Debugowanie hasha

        const prefix = sha1Hash.slice(0, 5).toUpperCase();
        const suffix = sha1Hash.slice(5).toUpperCase();
        console.log('Prefix:', prefix, 'Suffix:', suffix); // Debug prefixu i suffixu

        // Wyślij zapytanie do HIBP
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        console.log('Odpowiedź API HIBP:', response); // Debug odpowiedzi API

        const data = await response.text();
        console.log('Dane zwrócone przez API:', data); // Debug danych zwróconych przez API

        // Przetwarzanie odpowiedzi
        const breaches = data.split('\n').map(line => {
            const [hashSuffix, count] = line.split(':');
            return { hashSuffix: hashSuffix.trim(), count: parseInt(count.trim()) };
        });

        const breach = breaches.find(b => b.hashSuffix === suffix);
        console.log('Znalezione naruszenia:', breach); // Debugowanie znalezionych naruszeń

        if (breach) {
            resultDiv.textContent = `To hasło było użyte ${breach.count} razy.`;
            resultDiv.style.color = 'red';
            saveTestResult('lastBreachCheck', resultDiv.textContent); // Zapisz wynik HIBP
        } else {
            resultDiv.textContent = 'To hasło nie zostało jeszcze użyte.';
            resultDiv.style.color = 'green';
        }
    } catch (error) {
        console.error('Błąd podczas sprawdzania hasła:', error); // Debug błędów
        resultDiv.textContent = 'Błąd podczas sprawdzania hasła. Spróbuj ponownie później.';
        resultDiv.style.color = 'red';
    }
});

// Funkcja do obliczania SHA-1 hasła
async function sha1(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
