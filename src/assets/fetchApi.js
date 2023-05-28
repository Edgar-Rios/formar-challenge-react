import axios from 'axios'
const baseURL = "https://pokeapi.co/api/v2/";

export const getAllPokemones = async () => {

    const { data: firstHalfData } = await axios.get(
        `${baseURL}pokemon?limit=500&offset=0`
    );

    const { data: secondHalfData } = await axios.get(
        `${baseURL}pokemon?limit=1000&offset=500`
    );

    const firstPromises = firstHalfData.results.map(async pokemon => {
        const { data } = await axios.get(pokemon.url);
        return data;
    });
    const firstResults = await Promise.all(firstPromises);

    const secondPromises = secondHalfData.results.map(async pokemon => {
        const { data } = await axios.get(pokemon.url);            // const data = await res.json();
        return data;
    });
    const secondResults = await Promise.all(secondPromises);

    return [...firstResults, ...secondResults];
}

async function extractPokeData(data) {
    const promises = data.map(async pokemon => {
        const data = await axios.get(pokemon.url);

        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            weight: data.weight,
            abilities: [...data.moves],
        }
    });

    return await Promise.all(promises);

}