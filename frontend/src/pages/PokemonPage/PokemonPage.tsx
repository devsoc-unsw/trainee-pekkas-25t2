import { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import PokemonBox from "../../components/PokemonBox/PokemonBox";
import PokemonList from "../../components/PokemonList/PokemonList";
import type { PokemonData } from "../../utils/types";
import classes from "./PokemonPage.module.css";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard";

function PokemonPage() {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData>();
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);
  
  useEffect(() => {
    const fetchUserPokemon = async () => {
      try {
        const res = await axios.get(`${API_URL}/pokemon/owned`, {withCredentials: true});
        setPokemon(res.data as PokemonData[])
      } catch (err) {
        console.error("Error:", err);
      }
    }
    fetchUserPokemon();
  })
  return (
    <div className={classes.wrapper}>
      <Header />
      <Navbar />
      <div className={classes.contentWrapper}>
        <PokemonList pokemon={pokemon} onClick={(poke) => (
          setSelectedPokemon(poke)
        )}/>
        <ActivePokemonCard/>
        {/* <PokemonCard {...selectedPokemon ?? pokemon[0] ?? null}/> */}
      </div>
    </div>
  )
}

export default PokemonPage;
