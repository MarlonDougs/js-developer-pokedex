
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const skills = pokeDetail.abilities.map((skillsslot) => skillsslot.ability.name);
    const [skill] = skills

    pokemon.skills = skills
    pokemon.skill = skill

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    pokemon.base_stats.hp = pokeDetail.stats[0].base_stat
    pokemon.base_stats.attack = pokeDetail.stats[1].base_stat
    pokemon.base_stats.defense = pokeDetail.stats[2].base_stat
    pokemon.base_stats.specialAttack = pokeDetail.stats[3].base_stat
    pokemon.base_stats.specialDefense = pokeDetail.stats[4].base_stat
    pokemon.base_stats.speed = pokeDetail.stats[5].base_stat

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
