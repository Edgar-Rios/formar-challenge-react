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
    const [typeFilter, setTypeFilter] = useState("name");


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
        setPage(1);
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

    const seeMorePokemones = () => {
        setPage(page + 1);
    }

    const isMorePages = () => {
        if (searchText !== '')
            return listToRender.length > (page * 100)
        else
            return allPokemones.length > (page * 100)
    }
    // ---------------------------------------------------------       EFFECTS

    useEffect(() => {
        fetchAllPokemones();
    }, [])

    useEffect(() => {

        let list = [];
        console.log('efect filter')
        console.log(`type filter: ${typeFilter}`)

        // eslint-disable-next-line default-case
        switch (typeFilter) {
            case 'name':
                list = [...allPokemones.filter(
                    pokemon =>
                        pokemon.name.toLowerCase().includes(searchText.toLowerCase()))]
                break;
            case 'skill':
                list = [...allPokemones.filter(
                    ({ abilities }) => abilities.some(({ ability }) => ability.name.includes(searchText)))]
                break;
        }

        setFilteredPokemones([...list]);

    }, [searchText, allPokemones, typeFilter])




    return (
        <PokemonContext.Provider value={
            {
                listToRender,
                searchText,
                handlerSearcher,
                dropPokemonById,
                changeTypeFilter,
                seeMorePokemones,
                isMorePages,
            }
        }>
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider