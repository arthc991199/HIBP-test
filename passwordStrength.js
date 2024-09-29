function evaluatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;

    console.log('Siła hasła:', strength); // Debugowanie siły hasła
    return strength;
}

function displayPasswordStrength(strength) {
    const strengthText = ['Bardzo słabe', 'Słabe', 'Średnie', 'Dobre', 'Bardzo dobre'];
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Siła hasła: ${strengthText[strength]}`;
    resultDiv.style.color = strength < 3 ? 'red' : 'green';
    saveTestResult('lastStrength', resultDiv.textContent); // Zapisz siłę hasła
}

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strength = evaluatePasswordStrength(password);
    displayPasswordStrength(strength);
});
