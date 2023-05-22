import React, { useContext } from 'react';
import { PokemonContext } from '../../context/PokemonContext';

import './gallery.css';
import Card from '../Card';

function Gallery() {

    const { pokemonsOnView, dropPokemonById, nextPage, seeMorePokemones } = useContext(PokemonContext)

    const listCard = (list) => {
        return list.map(({ id, order, abilities, name, image, weight }) => (
            <Card key={`${order}-${name}`} id={id} handleClick={() => dropPokemonById(`${order}-${name}`)} abilities={abilities} name={name} image={image} weight={weight} order={order} />
        ))
    }

    console.log('pokemonsOnView')
    console.log(pokemonsOnView)

    return (
        <>
            {/* <h1>Pokemones</h1> */}
            <div className='gallery'>

                {
                    listCard(pokemonsOnView)
                }
                {nextPage ? <div><button onClick={() => seeMorePokemones(nextPage)}>see more</button></div> : ""}

            </div>
        </>
    )
}

export default Gallery