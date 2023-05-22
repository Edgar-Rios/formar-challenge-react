import React, { useContext, useState } from 'react'
import { PokemonContext } from '../../context/PokemonContext';

function Filter() {

  const { filter } = useContext(PokemonContext);

  const [inputText, setInputText] = useState("");

  function search() {

  }

  return (
    <form>
      <input type="text" name="input-text" id='input-text' onChange={() => search()} />
      <fieldset>
        <legend>filtrar</legend>
        <div>
          <label  >Nombre</label>
          <input type="radio" id="name" name="typeFilter" />
          <label  >Habilidad</label>
          <input type="radio" id="skill" name="typeFilter" />
        </div>
      </fieldset>
    </form>
  )
}

export default Filter;