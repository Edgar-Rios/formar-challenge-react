import React, { useEffect, useState } from 'react'

import { PokemonContext } from './PokemonContext';

import { fetchApi } from '../assets/fetchApi';

const PokemonProvider = ({ children }) => {

    const [pokemones, setPokemones] = useState([]);
    const [allPokemones, setAllPokemones] = useState([]);
    const [filteredPokemones, setFilteredPokemones] = useState([]);
    const [allMoves, SetAllMoves] = useState([])
    const [nextPage, setNextPage] = useState("");

    const pokemonsOnView = filteredPokemones !== [] ? pokemones : filteredPokemones;

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
        setPokemones([...pokemones.filter(pokemon => pokemon.order !== id)])
    }


    const filter = async () => {
        filteredPokemones.filter()
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
                dropPokemonById,
                seeMorePokemones,
            }
        }>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider