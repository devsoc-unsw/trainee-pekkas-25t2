import Card from '../Card/Card'
import styles from './ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'
import PencilIcon from '../../assets/pencil-icon.svg'
import PokemonElementTag from '../PokemonElementTag/PokemonElementTag'
import ProgressBar from '../ProgressBar/ProgressBar'

type pokemonData = {
  level: number,
  exp_lvl: number,
  nickname: string,
  icon: string
  type: string[]
}

type ActivePokemonCardProps = {
  data: pokemonData
  // more props if needed...
}

function ActivePokemonCard({ data }: ActivePokemonCardProps) {
  return (
    <Card className={styles.pokemonCard}>
      <div className={styles.swapButtonContainer}>
        <button type="button" className={styles.swapButton}>
          <img src={SwapIcon} alt="swap icon" className={styles.swapButtonIcon} />
        </button>
      </div>
      <div className={styles.pokemonContainer}>
        <div className={styles.pokemonProfileContainer}>
          <img src={data.icon} alt={`image of ${data.nickname}`} className={styles.pokemonIcon} />
        </div>
        <div className={styles.pokemonLevelContainer}>{data.level}</div>
      </div>
      <div className={styles.pokemonNameContainer}>
        <h1 className={styles.pokemonName}>{data.nickname}</h1>
        <img src={PencilIcon} alt="edit name button" className={styles.editButtonIcon} />
      </div>
      <div className={styles.divider}/>
      <div className={styles.elementsContainer}>
        {data.type.map((t) => <PokemonElementTag element={t}/>)}
      </div>
      <span>XP: <span className={styles.xpCounter}>{data.exp_lvl}/100</span></span>
      <ProgressBar percentFilled={data.exp_lvl}/>
    </Card>
  )
}

export default ActivePokemonCard