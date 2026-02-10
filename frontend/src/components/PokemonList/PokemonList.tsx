import React from 'react'
import classes from './PokemonList.module.css'
import type { PokemonData } from '../../utils/types'
import PokemonBox from '../PokemonBox/PokemonBox';

type PokemonListProps = {
    pokemon:PokemonData[]
    onClick: (pokemon:PokemonData) => void;
}

function PokemonList({pokemon, onClick}:PokemonListProps) {
  return (
    <div className={classes.listWrapper}>
        <p className={classes.yourPokemon}>Your Pokemon</p>
        <div className={classes.pokemonListDiv}>
            {
                pokemon.map((pokemon) => {
                if (!pokemon) return null;
                const icon = pokemon?.species?.icon ?? null;
                return (<PokemonBox key={pokemon.id} icon={icon}
                    onClick={() => {
                        onClick(pokemon);
                    }}
                />)
                })
            }
        </div>
    </div>
  )
}

export default PokemonList