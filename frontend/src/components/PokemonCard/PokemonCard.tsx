//So so messy... will need to refactor so that it's more object oriented soon but I got 2 hours what can I do ;-;
import Card from '../Card/Card'
import styles from '../ActivePokemonCard/ActivePokemonCard.module.css'
import SwapIcon from '../../assets/swap-icon.svg'
import PencilIcon from '../../assets/pencil-icon.svg'
import PokemonElementTag from '../PokemonElementTag/PokemonElementTag'
import ProgressBar from '../ProgressBar/ProgressBar'
import { useEffect, useRef, useState } from 'react'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import PokemonListModal from '../PokemonListModal/PokemonListModal'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { useNavigate } from "react-router";
import type { PokemonData } from '../../utils/types'

function PokemonCard(props:PokemonData) {
  const [refresh, setRefresh] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // pokemon stats
  const [data, setData] = useState<PokemonData | null>(props)
  const [nickname, setNickname] = useState<string>('')
  const [newNickname, setNewNickname] = useState<string>('')

  const isFirstFetch = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;

    const fetchActivePokemon = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(`${API_URL}/pokemon/active`, { withCredentials: true });
        setData(response.data as PokemonData);

        // Do not trigger animation on mount
        if (!isFirstFetch.current) {
          setActive(true);
          timer = setTimeout(() => setActive(false), 400);
        } else {
          isFirstFetch.current = false;
        }
      } catch (err) {
        console.error("Failed to fetch active Pokemon:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivePokemon();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [refresh]);

  useEffect(() => {
    if (data) {
      const name = data?.nickname ?? data?.species?.species_name;
      setNickname(name);
      setNewNickname(name);
    }
  }, [data]);

  const levelUpPokemon = () => {
    if (!data) {
      setError(true)
      setErrorMessage("You currently do not have an active pokemon!")
      return
    }

    // make req to backend and update data
    setIsLoading(true)

    axios.post(`${API_URL}/pokemon/levelup/${data.id}`, {withCredentials: true})
      .then(() => {
        // for animation purposes
        setIsLoading(false);
        setRefresh(prev => !prev)
      })
      .catch((err: Error) => {
        setIsLoading(false);
        setError(true)
        setErrorMessage(err.message)
        return
      })
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

  if (data === null || data === undefined) {
      return (
        <Card className={`${styles.pokemonCard} center-row center-col`}>
          You currently do not have an active pokemon.
          <PrimaryButton onClick={() => navigate("/pokemon")}>
            Set an active pokemon
          </PrimaryButton>
        </Card>
      )
  }

  return (
    <Card className={styles.pokemonCard}>
      <div className={styles.swapButtonContainer}>
        <button 
          type="button"
          className={styles.swapButton}
          onClick={() => setShowModal(true)}
        >
          <img 
            src={SwapIcon}
            alt="swap icon"
            className={styles.swapButtonIcon}
          />
        </button>
      </div>
      <div className={styles.pokemonContainer}>
        <div className={`${styles.pokemonProfileContainer} ${active ? styles.active : ''}`}>
          <img src={data?.species?.icon} alt={`image of ${nickname}`} className={styles.pokemonIcon} />
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
        {[data?.species?.primary_type, data?.species?.secondary_type].map((t, key) => {
          if (t)
            return <PokemonElementTag element={t} key={key}/>
        })}
      </div>
      <span>XP: <span className={`${styles.xpCounter} ${active ? styles.active : ''}`}>{data.exp_lvl}/100</span></span>
      <ProgressBar percentFilled={Math.min(data?.exp_lvl, 100)}/>
      <div className={styles.center}>
        {(data?.exp_lvl >= 100) &&
            <PrimaryButton 
              onClick={levelUpPokemon}
            >
              Level Up
            </PrimaryButton>
        }
        {error && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
      <PokemonListModal 
        visible={showModal}
        onSwap={onSwap}
        onClose={() => setShowModal(false)}
      />
      {isLoading && <LoadingScreen/>}
    </Card>
  )
}

export default PokemonCard