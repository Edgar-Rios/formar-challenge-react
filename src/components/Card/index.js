import React from 'react'

import './card.css';
function Card({ image, name, weight, abilities, handleClick, id }) {

    // console.log(abilities)
    return (
        <article className='card-pokemon'>
            <div className='content-image'>
                <img src={image} alt={`image of ${name}`} />
            </div>
            <section>
                <h2 className='name-pokemon'>{`#${id} ${name}`}</h2>
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
                        {abilities.map(({ ability }, index) => <span key={index}>{(ability.name).split('-').join(' ')}</span>)}
                    </fieldset>

                </div>
            </section>
            <span className='button-drop' onClick={() => handleClick(id)}>X</span>
        </article>
    )
}

export default Card;