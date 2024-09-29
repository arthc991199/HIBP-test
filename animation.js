function animateResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.style.opacity = 0;
    setTimeout(() => {
        resultDiv.style.opacity = 1;
    }, 500);
}

document.getElementById('passwordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    animateResult();
});
