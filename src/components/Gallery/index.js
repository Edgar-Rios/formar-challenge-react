import React, { useContext } from 'react';
import { PokemonContext } from '../../context/PokemonContext';

import './gallery.css';
import Card from '../Card';

function Gallery() {

    const { pokemones, dropPokemonById, nextPage, seeMorePokemones } = useContext(PokemonContext)
    // console.log('en galeria')
    console.log(pokemones)
    return (
        <>
            {/* <h1>Pokemones</h1> */}
            <div className='gallery'>
                {pokemones.map(({ order, abilities, name, image, weight }) => (
                    <Card key={order} handleClick={() => dropPokemonById(order)} abilities={abilities} name={name} image={image} weight={weight} order={order} />
                ))}
                {nextPage && <div><button onClick={() => seeMorePokemones(nextPage)}>see more</button></div>}
            </div>
        </>
    )
}

export default Gallery