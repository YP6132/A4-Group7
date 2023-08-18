const searchButton = document.getElementById('search-button');
const pokemonNameInput = document.getElementById('pokemon-name');
const pokemonInfoDiv = document.getElementById('pokemon-info');

searchButton.addEventListener('click', () => {
    const pokemonName = pokemonNameInput.value.trim().toLowerCase();
    if (pokemonName !== '') {
        fetchPokemonInfo(pokemonName);
    }
});

function fetchPokemonInfo(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const name = data.name;
            const id = data.id;
            const types = data.types.map(type => type.type.name).join(', ');
            const abilities = data.abilities.map(ability => ability.ability.name).join(', ');

            const infoHtml = `
                <h2>${name} (ID: ${id})</h2>
                <p><strong>Types:</strong> ${types}</p>
                <p><strong>Abilities:</strong> ${abilities}</p>
            `;

            pokemonInfoDiv.innerHTML = infoHtml;
        })
        .catch(error => {
            console.error('Error fetching Pokémon info:', error);
            pokemonInfoDiv.textContent = 'An error occurred!!! try again later.';
        });
}
