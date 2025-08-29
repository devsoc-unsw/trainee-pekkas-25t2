import React from 'react'
import Card from '../Card/Card'
import styles from './ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'
import PokemonExampleIcon from '../../assets/pokemon-example-icon.png'

function ActivePokemonCard() {
  return (
    <Card className={styles.pokemonCard}>
      <div className={styles.swapButtonContainer}>
        <button type="button" className={styles.swapButton}>
          <img src={SwapIcon} alt="swap icon" className={styles.swapButtonIcon} />
        </button>
      </div>
      <div className={styles.pokemonContainer}>
        <div className={styles.pokemonProfileContainer}>
          <img src={PokemonExampleIcon} alt="image of a pokemon" className={styles.pokemonIcon} />
        </div>
        <div className={styles.pokemonLevelContainer}>10</div>
      </div>
    </Card>
  )
}

export default ActivePokemonCard