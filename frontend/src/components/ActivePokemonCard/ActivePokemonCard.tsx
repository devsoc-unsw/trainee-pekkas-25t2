import Card from '../Card/Card'
import styles from './ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'
import PencilIcon from '../../assets/pencil-icon.svg'
import PokemonElementTag from '../PokemonElementTag/PokemonElementTag'
import ProgressBar from '../ProgressBar/ProgressBar'
import { useEffect, useState } from 'react'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import PokemonListModal from '../PokemonListModal/PokemonListModal'

type PokemonData = {
  id: number,
  trainerId: number,
  level: number,
  exp_lvl: number,
  nickname: string | null,
  species: {
    pokedex_number: number,
    species_name: string,
    primary_type: string,
    secondary_type: string | null,
    level_to_evolve: number | null,
    evolves_from_id: number | null,
    icon: string,
    base_pokemon: boolean,
    rarity: string
  }
} | null;


// type ActivePokemonCardProps = {
//   pokemonData: pokemonData
//   // more props if needed...
// }

function ActivePokemonCard() {
  const [refresh, setRefresh] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [active, setActive] = useState(false)

  // pokemon stats
  const [data, setData] = useState<PokemonData | null>(null)
  const [nickname, setNickname] = useState<string>('')
  const [newNickname, setNewNickname] = useState<string>('')

  // refresh when swapping pokemons
  useEffect(() => {
    const fetchActivePokemon = async () => {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/pokemon/active`, {withCredentials: true});
      setData(response.data as PokemonData);
      setIsLoading(false);
    };

    fetchActivePokemon();
  }, [refresh]);

  useEffect(() => {
    if (data) {
      const name = data.nickname ?? data.species.species_name;
      setNickname(name);
      setNewNickname(name);
    }
  }, [data]);

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

  const changeNickname = async () => {
    setIsEditing(false)
    setNickname(newNickname)

    // only request name change if name actually changed
    if (!data)
      return

    if (nickname !== newNickname) {
      await axios.post(
        `${API_URL}/pokemon/instance/${data.id}/rename`,
        {newname: newNickname},
        {withCredentials: true}
      )
    }
  }

  const onSwap = () => {
    setShowModal(false)
    setRefresh(prev => !prev)
  }


  if (!data) {
    if (isLoading) {
      return (
        <Card className={`${styles.pokemonCard} center-row center-col`}>
          <div className={`${styles.loading}`}/>
        </Card>
      )
    } else {
      return (
        <Card className={`${styles.pokemonCard} center-row center-col`}>
          You currently do not have an active pokemon.
          <PrimaryButton onClick={() => setShowModal(prev => !prev)}>
            Set an active pokemon
          </PrimaryButton>
          {showModal && <PokemonListModal onSwap={onSwap}/>}
        </Card>
      )
    }
  }

  return (
    <Card className={styles.pokemonCard}>
      <div className={styles.swapButtonContainer}>
        <button type="button" className={styles.swapButton}>
          <img 
            src={SwapIcon}
            alt="swap icon"
            className={styles.swapButtonIcon}
            onClick={() => setShowModal(prev => !prev)}
          />
        </button>
      </div>
      <div className={styles.pokemonContainer}>
        <div className={`${styles.pokemonProfileContainer} ${active ? styles.active : ''}`}>
          <img src={data.species.icon} alt={`image of ${nickname}`} className={styles.pokemonIcon} />
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
        {[data.species.primary_type, data.species.secondary_type].map((t) => {
          if (t)
            return <PokemonElementTag element={t}/>
        })}
      </div>
      <span>XP: <span className={`${styles.xpCounter} ${active ? styles.active : ''}`}>{data.exp_lvl}/100</span></span>
      <ProgressBar percentFilled={Math.min(data.exp_lvl, 100)}/>
      <div className='center-row'>
        {(data.exp_lvl >= 100) && <PrimaryButton onClick={levelUpPokemon}>Level Up</PrimaryButton>}
      </div>
      {showModal && <PokemonListModal onSwap={onSwap}/>}
    </Card>
  )
}

export default ActivePokemonCard