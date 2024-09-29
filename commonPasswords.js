const commonPasswords = ['123456', 'password', '123456789', 'qwerty', 'abc123', 'password1'];

function checkCommonPasswords(password) {
    const isCommon = commonPasswords.includes(password);
    console.log(`Czy hasło "${password}" jest popularne?:`, isCommon); // Debugowanie wyniku
    return isCommon;
}

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const resultDiv = document.getElementById('result');
    if (checkCommonPasswords(password)) {
        resultDiv.textContent = 'To hasło jest zbyt popularne!';
        resultDiv.style.color = 'orange';
    }
});
