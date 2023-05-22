import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../../context/PokemonContext';

function Filter() {

  const { filter, changeTypeFilter, searchText } = useContext(PokemonContext);

  return (
    <form>
      <input type="text" name="input-text" id='input-text' onChange={filter} value={searchText} />
      <fieldset>
        <legend>filtrar</legend>
        <div>
          <label >Nombre</label>
          <input type="radio" name="typeFilter" value="name" onChange={changeTypeFilter} defaultChecked />
          <label >Habilidad</label>
          <input type="radio" name="typeFilter" value="skill" onChange={changeTypeFilter} />
        </div>
      </fieldset>
    </form>
  )
}

export default Filter;