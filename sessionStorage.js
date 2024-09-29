function saveTestResult(key, result) {
    console.log(`Zapisywanie wyniku testu (${key}) w sesji:`, result);
    sessionStorage.setItem(key, result); // Zapisywanie pod różnymi kluczami
}

function loadTestResult() {
    const lastStrength = sessionStorage.getItem('lastStrength');
    const lastBreachCheck = sessionStorage.getItem('lastBreachCheck');
    
    const resultDiv = document.getElementById('result');

    if (lastStrength) {
        console.log('Odczytany wynik siły hasła z sesji:', lastStrength);
        resultDiv.textContent = `Ostatnia siła hasła: ${lastStrength}`;
    }

    if (lastBreachCheck) {
        console.log('Odczytany wynik sprawdzenia hasła w HIBP z sesji:', lastBreachCheck);
        resultDiv.textContent = `Ostatni wynik sprawdzenia hasła: ${lastBreachCheck}`;
    }
}

window.onload = loadTestResult;

document.getElementById('passwordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const result = document.getElementById('result').textContent;
    
    if (result.includes('Siła hasła')) {
        saveTestResult('lastStrength', result);
    } else if (result.includes('hasło było użyte')) {
        saveTestResult('lastBreachCheck', result);
    }
});
