
const baseUrl = "https://pokeapi.co/api/v2/";

export async function fetchApi(params, query = "") {
    let data = await fetch(`${baseUrl}${params}${query !== "" ? `${query}` : ""}`);

    let { next, results } = await data.json();

    if (results.length > 500) return { data: results }

    const promises = results.map(async pokemon => {
        const res = await fetch(pokemon.url);
        const data = await res.json();

        return {
            order: +(data.order),
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            weight: data.weight,
            abilities: [...data.moves],
        }
    });

    const response = await Promise.all(promises);
    // console.log(response)

    // console.log(response)
    // console.log(results.results)
    return {
        nextPage: next,
        data: response,
    };
}
