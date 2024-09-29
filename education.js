function displayEducationalInfo() {
    const educationDiv = document.getElementById('education');
    
    if (!educationDiv) {
        console.error('Nie znaleziono elementu #education w DOM'); // Debug brakującego elementu
        return;
    }

    const info = [
        'Dlaczego ważne jest tworzenie silnych haseł?',
        'Jak działa weryfikacja dwuetapowa (2FA)?',
        'Co zrobić w przypadku wycieku danych?'
    ];

    educationDiv.innerHTML = ''; // Wyczyść poprzednie informacje
    console.log('Ładowanie treści edukacyjnych:', info); // Debug treści edukacyjnych

    info.forEach(item => {
        const p = document.createElement('p');
        p.textContent = item;
        educationDiv.appendChild(p);
    });
}

window.addEventListener('load', function () {
    console.log('Strona załadowana, ładowanie modułu edukacyjnego'); // Debugowanie ładowania strony
    displayEducationalInfo();
});
