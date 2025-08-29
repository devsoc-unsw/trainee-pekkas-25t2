import React from 'react'
import Card from '../Card/Card'
import styles from './ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'

function ActivePokemonCard() {
  return (
    <Card className={styles.pokemonCard}>
      <div className={styles.swapButtonContainer}>
        <button type="button" className={styles.swapButton}>
          <img src={SwapIcon} alt="swap icon" className={styles.swapButtonIcon} />
        </button>
      </div>
    </Card>
  )
}

export default ActivePokemonCard