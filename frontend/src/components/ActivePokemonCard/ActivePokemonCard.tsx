import Card from '../Card/Card'
import styles from './ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'
import PencilIcon from '../../assets/pencil-icon.svg'
import PokemonElementTag from '../PokemonElementTag/PokemonElementTag'
import ProgressBar from '../ProgressBar/ProgressBar'
import { useEffect, useState } from 'react'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

type pokemonData = {
  level: number,
  exp_lvl: number,
  nickname: string,
  icon: string
  type: string[]
}

type ActivePokemonCardProps = {
  pokemonData: pokemonData
  // more props if needed...
}

function ActivePokemonCard({ pokemonData }: ActivePokemonCardProps) {
  const [data, setData] = useState(pokemonData)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>(data.nickname)
  const [newNickname, setNewNickname] = useState<string>(data.nickname)

  const [active, setActive] = useState(false)

  useEffect(() => {
    setData(pokemonData)
  }, [pokemonData])

  const levelUpPokemon = () => {
    // make req to backend and update data
    // setData(updated_pokemon_data)

    // for animation purposes
    setActive(true);
    const timer = setTimeout(() => setActive(false), 400);
    return () => clearTimeout(timer);
  }

  const cancelChangeNickname = () => {
    setIsEditing(false)
    setNewNickname(nickname)
  }

  const changeNickname = () => {
    setIsEditing(false)
    setNickname(newNickname)

    // only request name change if name actually changed
    if (nickname !== newNickname) {
      console.log(`send req to backend to change nickname from ${nickname} to ${newNickname}`)
    }
  }

  return (
    <Card className={styles.pokemonCard}>
      <div className={styles.swapButtonContainer}>
        <button type="button" className={styles.swapButton}>
          <img src={SwapIcon} alt="swap icon" className={styles.swapButtonIcon} />
        </button>
      </div>
      <div className={styles.pokemonContainer}>
        <div className={`${styles.pokemonProfileContainer} ${active ? styles.active : ''}`}>
          <img src={data.icon} alt={`image of ${data.nickname}`} className={styles.pokemonIcon} />
        </div>
        <div
          className={`${styles.pokemonLevelContainer} ${active ? `${styles.active}` : ''}`}
        >
          {data.level}
        </div>
      </div>
      <div className={styles.pokemonNameContainer}>
        {/* Default pokemon name display */}
        <div style={{ display: isEditing ? 'none' : 'block' }}>
          <h1 className={styles.pokemonName}>{nickname}</h1>
          <img 
            src={PencilIcon}
            alt="edit name button"
            className={styles.editButtonIcon}
            onClick={() => setIsEditing(true)}
          />
        </div>
        
        {/* Edit mode */}
        <div 
          className={styles.editModeContainer}
          style={{ display: isEditing ? 'flex' : 'none'}}
        >
          <input 
            type="text"
            className={styles.editModeContainerInput}
            onChange={(e) => setNewNickname(e.target.value)}
            value={newNickname}
          />
          <div className={styles.editModeButtonContainer}>
            <button type='button' className={styles.editModeContainerCancelButton} onClick={cancelChangeNickname}>
              Cancel
            </button>
            <button type='button' className={styles.editModeContainerSaveButton} onClick={changeNickname}>
              Save
            </button>
          </div>
        </div>

      </div>
      <div className={styles.divider}/>
      <div className={styles.elementsContainer}>
        {data.type.map((t) => <PokemonElementTag element={t}/>)}
      </div>
      <span>XP: <span className={`${styles.xpCounter} ${active ? styles.active : ''}`}>{data.exp_lvl}/100</span></span>
      <ProgressBar percentFilled={Math.min(data.exp_lvl, 100)}/>
      <div className='center-row'>
        {(data.exp_lvl >= 100) && <PrimaryButton onClick={levelUpPokemon}>Level Up</PrimaryButton>}
      </div>
    </Card>
  )
}

export default ActivePokemonCard