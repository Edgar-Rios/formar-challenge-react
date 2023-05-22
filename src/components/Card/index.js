import React from 'react'

import './card.css';
function Card({ image, name, weight, abilities, handleClick, order }) {

    // console.log(abilities.slice(0, 4))
    return (
        <article className='card-pokemon'>
            <div className='content-image'>
                <img src={image} alt={`image of ${name}`} />
            </div>
            <section>
                <h2 className='name-pokemon'>{`#${order} ${name}`}</h2>
                <div className='info'>
                    <fieldset>
                        <legend>atributes</legend>
                        <div>
                            <span className='atribute'>weight: </span>
                            <span> {`  ${weight}`}´</span>
                        </div>
                    </fieldset>


                    <fieldset>
                        <legend>abilities</legend>
                        {abilities.slice(0, 4).map(({ move }, index) => <span key={index}>{(move.name).split('-').join(' ')}</span>)}
                    </fieldset>

                </div>
            </section>
            <span className='button-drop' onClick={() => handleClick(order)}>X</span>
        </article>
    )
}

export default Card;