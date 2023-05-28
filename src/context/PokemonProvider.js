import React, { useEffect, useState, useMemo } from 'react'

import { PokemonContext } from './PokemonContext';

import { getAllPokemones } from '../assets/fetchApi';

const PokemonProvider = ({ children }) => {

    // const [pokemones, setPokemones] = useState([]);
    const [allPokemones, setAllPokemones] = useState([]);
    const [filteredPokemones, setFilteredPokemones] = useState([]);
    const [arrDropedIdList, setArrDropedIdList] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [typeFilter, setTypeFilter] = useState("");


    // ------------------------------------------------------------     MEMO
    const listToRender = useMemo(() => {

        if (allPokemones === [] && filteredPokemones === []) return [];

        let list = (searchText === '') ? allPokemones : filteredPokemones;

        return list.filter(pokemon => !(new Set(arrDropedIdList).has(+(pokemon.id)))).slice(0, (page * 100));

    }, [allPokemones, filteredPokemones, searchText, page, arrDropedIdList]);

    // ---------------------------------------------------------     FUNCTIONS

    const fetchAllPokemones = async () => {

        const globalList = await getAllPokemones()
        setAllPokemones([...globalList]);
        // setLoading(false);
    }

    function handlerSearcher({ target }) {
        console.log(`${target.value}`)
        setSearchText(`${target.value}`);
    }

    const dropPokemonById = async (id) => {

        const dropedIds = new Set(arrDropedIdList);
        dropedIds.add(id);
        setArrDropedIdList([...dropedIds]);

    }

    const changeTypeFilter = async ({ target }) => {
        setSearchText("");
        setTypeFilter(target.value);
        setFilteredPokemones([]);
    }

    // ---------------------------------------------------------       EFFECTS

    useEffect(() => {
        fetchAllPokemones();
    }, [])

    useEffect(() => {
        setFilteredPokemones([...allPokemones.filter(pokemon => pokemon.name.toLowerCase().includes(searchText.toLowerCase()))]);

    }, [searchText, allPokemones])




    return (
        <PokemonContext.Provider value={
            {
                listToRender,
                searchText,
                handlerSearcher,
                dropPokemonById,
                changeTypeFilter,
            }
        }>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider