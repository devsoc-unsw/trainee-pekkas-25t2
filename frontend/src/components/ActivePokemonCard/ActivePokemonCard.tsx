import Card from '../Card/Card'
import styles from './ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'
import PencilIcon from '../../assets/pencil-icon.svg'
import PokemonElementTag from '../PokemonElementTag/PokemonElementTag'
import ProgressBar from '../ProgressBar/ProgressBar'
import { useState } from 'react'

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
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>(data.nickname)
  const [newNickname, setNewNickname] = useState<string>(data.nickname)

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
        <div className={styles.pokemonProfileContainer}>
          <img src={data.icon} alt={`image of ${data.nickname}`} className={styles.pokemonIcon} />
        </div>
        <div className={styles.pokemonLevelContainer}>{data.level}</div>
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
      <span>XP: <span className={styles.xpCounter}>{data.exp_lvl}/100</span></span>
      <ProgressBar percentFilled={data.exp_lvl}/>
    </Card>
  )
}

export default ActivePokemonCard