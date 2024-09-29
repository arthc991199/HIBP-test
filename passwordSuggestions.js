function displaySuggestions(isBreached) {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    const suggestions = [
        'Używaj haseł o długości co najmniej 12 znaków.',
        'Unikaj prostych i popularnych haseł.',
        'Stosuj menedżery haseł do generowania i przechowywania haseł.',
        'Włącz weryfikację dwuetapową (2FA) na wszystkich kontach.'
    ];

    if (isBreached) {
        suggestions.unshift('Hasło zostało skompromitowane! Zmień je natychmiast.');
    }

    console.log('Wyświetlanie sugestii:', suggestions); // Debugowanie sugestii

    suggestions.forEach(suggestion => {
        const p = document.createElement('p');
        p.textContent = suggestion;
        suggestionsDiv.appendChild(p);
    });
}
