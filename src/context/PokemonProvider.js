import React, { useEffect, useState } from 'react'

import { PokemonContext } from './PokemonContext';

import { extractPokeData, fetchApi } from '../assets/fetchApi';

const PokemonProvider = ({ children }) => {

    const [pokemones, setPokemones] = useState([]);
    const [allPokemones, setAllPokemones] = useState([]);
    const [filteredPokemones, setFilteredPokemones] = useState([]);
    const [allMoves, SetAllMoves] = useState([]);
    const [nextPage, setNextPage] = useState("");
    const [searchText, setSearchText] = useState("");
    const [typeFilter, setTypeFilter] = useState("");


    let pokemonsOnView = filteredPokemones.length === 0 ? pokemones : filteredPokemones;

    const getPokemones = async () => {

        const { data, next } = await fetchApi('pokemon');
        // console.log(data);

        setPokemones([...pokemones, ...data]);
        setNextPage(next);
    }

    const seeMorePokemones = async (req) => {

        const { data } = await fetchApi('pokemon', `${req.slice(req.indexOf('?'))}`);

        setPokemones([...pokemones, ...data]);
    }

    const getAllPokemones = async () => {

        const { data } = await fetchApi('pokemon', '?limit=1000000&offset=0');
        console.log(`data all ${data}`)
        setAllPokemones([...allPokemones, ...data]);
    }

    const getAllMovesPokemon = async () => {

        // const { data } = await fetchApi('ability', '?limit=1000000');
        // console.log(data)
        // SetAllMoves([...data]);

    }

    const dropPokemonById = async (id) => {
        if (filteredPokemones.length > 0) {
            setFilteredPokemones([...filteredPokemones.filter(pokemon => pokemon.id !== id)])
        } else {
            setPokemones([...pokemones.filter(pokemon => pokemon.id !== id)])
        }
    }


    const filter = async ({ target }) => {

        setTimeout(() => {


        }, 1000);
        setSearchText(target.value);
        // console.log(searchText)
        let listFiltered = []
        console.log(target.value)
        let filtered = allPokemones.filter(pokemon => pokemon.name.includes(searchText));

        if (filtered.length > 0) {
            let pokeData = await extractPokeData(filtered);
            // console.log(pokeData)
            listFiltered = pokeData;
        }

        setFilteredPokemones(listFiltered);
    }

    const changeTypeFilter = async ({ target }) => {
        setSearchText("");
        setTypeFilter(target.value);
        setFilteredPokemones([]);
    }

    useEffect(() => {
        // console.log('function useEfect')
        getPokemones();
    }, [])

    useEffect(() => {
        // console.log('function useEfect')
        getAllPokemones();
    }, [])

    useEffect(() => {
        getAllMovesPokemon();
    }, [])


    return (
        <PokemonContext.Provider value={
            {
                pokemones,
                allPokemones,
                allMoves,
                nextPage,
                pokemonsOnView,
                searchText,
                filteredPokemones,
                filter,
                dropPokemonById,
                seeMorePokemones,
                changeTypeFilter,
            }
        }>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider