import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import styles from "./PokemonListModal.module.css"
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

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
}[] | null

type PokemonListModalProps = {
  onSwap: () => void;
}

function PokemonListModal({ onSwap }: PokemonListModalProps) {
  const [data, setData] = useState<Pokemons | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(`${API_URL}/pokemon/owned`, {withCredentials: true});
      setData(response.data);
    };

    fetchPokemons();
  }, []);

  if (!data) {
    return (
      <Card className={styles.modalContainer}>
          {"You currently have no pokemons... :("}
        </Card>
    )
  }

  return (
    <>
      <Card className={styles.modalContainer}>
        {data.map(d => {
          return <img 
            src={d.species.icon}
            alt="your pokemon"
            className={styles.pokemonContainer}
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
      </Card>
      {isLoading && <LoadingScreen/>}
    </>
  )
}

export default PokemonListModal