import React, { useContext } from 'react';
import { PokemonContext } from '../../context/PokemonContext';

import './gallery.css';
import Card from '../Card';

function Gallery() {

    const { listToRender, dropPokemonById, seeMorePokemones, isMorePages } = useContext(PokemonContext);

    // console.log('from GALLERY')
    // console.log(listToRender)
    const listCard = list =>
        list.map((pokemon) => {

            let pokedata = {
                key: `${pokemon.id}-${pokemon.order}`,
                name: pokemon.name,
                id: pokemon.id,
                image: pokemon.sprites.other['official-artwork'].front_default,
                abilities: pokemon.abilities,
                weight: pokemon.weight,
            }
            // console.log(pokedata)

            return (
                <Card key={pokedata.key} id={pokedata.id} handleClick={() => dropPokemonById(pokedata.id)} abilities={pokedata.abilities} name={pokedata.name} image={pokedata.image} weight={pokedata.weight} />)
        })

    // console.log(`pokemons to render? ${listToRender.length}`)
    // console.log(`is more pages? ${isMorePages()}`)

    return (
        <>
            {/* <h1>Pokemones</h1> */}
            <div className='gallery'>

                {listCard(listToRender)}

                {isMorePages() && <div><button onClick={() => seeMorePokemones()}>see more</button></div>}

            </div>
        </>
    )
}

export default Gallery;