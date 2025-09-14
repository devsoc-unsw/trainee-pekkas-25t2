import React from 'react'
import type { PokemonIconProp } from '../../utils/types'
import classes from "./PokemonBox.module.css"
function PokemonBox({icon, onClick}:PokemonIconProp) {
  return (
    <div className={classes.pokemonBox} onClick={onClick}>
        <img src={icon !== null ? icon : ""} alt="" />
    </div>
  )
}

export default PokemonBox