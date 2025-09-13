import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import styles from "./PokemonListModal.module.css"
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CloseIcon from "../../assets/cross-circle.svg"

type Pokemons = {
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
}[]

type PokemonListModalProps = {
  onSwap: () => void;
  onClose: () => void;
  visible: boolean;
}

function PokemonListModal({ onSwap, onClose, visible }: PokemonListModalProps) {
  const [data, setData] = useState<Pokemons | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (visible) {
      setIsFetching(true)
      const fetchPokemons = async () => {
        const response = await axios.get(`${API_URL}/pokemon/owned`, {withCredentials: true});
        setData(response.data);
        setIsFetching(false)
      };
  
      fetchPokemons();
    }
  }, [visible]);

  if (!data) {
    if (isFetching) {
      return (
        <div style={{display: visible ? "block" : "none"}}>
          <Card className={styles.modalContainer}>
            <div className={styles.closeButtonContainer}>
              <img 
                src={CloseIcon}
                className={styles.closeButton}
                alt="close"
                onClick={onClose}
              />
            </div>
            <div className={styles.spinner}/>
            <h3 className={styles.heading}>{"Fetching your pokemons..."}</h3>
          </Card>
        </div>
      )
    }

    return (
      <div style={{display: visible ? "block" : "none"}}>
        <Card className={styles.modalContainer}>
          <div className={styles.closeButtonContainer}>
            <img 
              src={CloseIcon}
              className={styles.closeButton}
              alt="close"
              onClick={onClose}
            />
          </div>
          {"You currently have no pokemons. Open some packs!"}
        </Card>
      </div>
    )
  }

  return (
    <div style={{display: visible ? "block" : "none"}}>
      <Card className={styles.modalContainer}>
        <div className={styles.closeButtonContainer}>
          <img 
            src={CloseIcon}
            className={styles.closeButton}
            alt="close"
            onClick={onClose}
          />
        </div>
        <h2 className={styles.heading}>Your Pokemons</h2>
        <div className={styles.pokemonListContainer}>
          {data.map((d, key) => {
            return <img 
              src={d.species.icon}
              alt="your pokemon"
              className={styles.pokemonContainer}
              key={key}
              onClick={async () => {
                setIsLoading(true)
                axios.post(`${API_URL}/pokemon/active`, {pokemonId: d.id}, {withCredentials: true})
                  .then(() => {
                    onSwap()
                    setIsLoading(false)
                  })
              }}
            />
          })}
        </div>
      </Card>
      {isLoading && <LoadingScreen/>}
    </div>
  )
}

export default PokemonListModal