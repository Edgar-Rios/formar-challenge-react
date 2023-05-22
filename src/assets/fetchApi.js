
const baseUrl = "https://pokeapi.co/api/v2/";

export async function fetchApi(params, query = "") {
    let data = await fetch(`${baseUrl}${params}${query !== "" ? `${query}` : ""}`);

    let { next, results } = await data.json();

    if (results.length > 500) return { data: results }

    // console.log(response)

    const response = await extractPokeData(results);
    // console.log(response)
    // console.log(results.results)
    return {
        nextPage: next,
        data: response,
    };
}

export async function extractPokeData(data) {
    const promises = data.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const data = await res.json();

        return {
            id: `${data.order}-${data.name}`,
            order: +(data.order),
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            weight: data.weight,
            abilities: [...data.moves],
        }
    });

    return await Promise.all(promises);

}