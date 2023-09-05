const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="additional-info">
                <p>Heigh: ${pokemon.height}</p>
                <p>Weigh: ${pokemon.weight}Kg</p>
                ${pokemon.skills.map((skill) => `<p Skill: ${skill}"> Skill: ${skill}</p>`).join('')}
                <p>HP: ${pokemon.base_stats.hp}</p>
                <p>Attack:${pokemon.base_stats.attack}</p>
                <p>Defense: ${pokemon.base_stats.defense}</p>
                <p>Sp. Atk.: ${pokemon.base_stats.specialAttack}</p>
                <p>Sp. Def.: ${pokemon.base_stats.specialDefense}</td>         
                 <p>Speed: ${pokemon.base_stats.speed}</p>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function toggleAdditionalInfo(pokemonElement) {
    const additionalInfo = pokemonElement.querySelector('.additional-info');
    additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';
  }

document.querySelectorAll('.pokemon').forEach((pokemonElement) => {
    pokemonElement.addEventListener('click', () => {
        toggleAdditionalInfo(pokemonElement);});
});