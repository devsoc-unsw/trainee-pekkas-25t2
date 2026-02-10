import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import classes from "./PackPage.module.css"
import { useState, useEffect } from 'react';
//import { useNavigate } from "react-router"
//import { pokemonData } from "../../pokemonData"
import axios from 'axios';
import { API_URL } from "../../utils/constants";
function PackPage() {
  const [claimed, setClaimed] = useState(false)
  const [reward, setReward] = useState<any | null>(null)
  const [cooldown, setCooldown] = useState<number>(0)
  const [caught, setCaught] = useState(0);
  const [pokeballs, setPokeballs] = useState<number|null>(null)
  // const rarityWeights = {
  //   common: 60,
  //   uncommon: 25,
  //   rare: 10,
  //   starter: 4,
  //   legendary: 1
  // }

  // Randomly selects a rarity based on the above percentages
  // const chooseRarity = () => {
  //   const num = Math.floor(Math.random() * 100) + 1;
  //   console.log(num)
  //   if (num >= 1 && num <= 60) {
  //     return "common"
  //   }
  //   if (num >= 61 && num <= 85) {
  //     return "uncommon"
  //   }
  //   if (num >= 86 && num <= 95) {
  //     return "rare"
  //   }
  //   if (num >= 96 && num <= 99) {
  //     return "starter"
  //   }
  //   else return "legendary"
  // }

  // Function to claim a Pokémon
  // const claimPack = () => {
  //   // if (claimed) return
  //   if (cooldown > 0) {
  //     return;
  //   }

  //   const chosenRarity = chooseRarity()
  //   const filtered = pokemonData.filter(
  //     (p) => p.rarity === chosenRarity
  //   )

  //   // If no Pokémon with that rarity, fallback to common pool
  //   const pool = filtered.length > 0 ? filtered : pokemonData.filter(p => p.rarity === "common")

  //   const chosen = pool[Math.floor(Math.random() * pool.length)]

  //   setReward(chosen)
  //   setClaimed(true)
  //   setCooldown(10)
  // }

  useEffect(() => {
    const fetchPokeballs = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/pokeballs`, { withCredentials: true });
        setPokeballs(res.data.pokeballs);
      } catch (err) {
        console.error("Failed to fetch pokeballs:", err);
      }
    };

    fetchPokeballs();
  }, [caught]);

  const catchPokemon = async () => {
    try {
      const res = await axios.post(`${API_URL}/pokemon/catch`, {}, { withCredentials: true });
      if (!res.data) {
        alert(res.data.message);
      }
      setReward(res.data)
      setClaimed(true)
      setCooldown(5)
      setCaught((t) => t+1);
    } catch (err:any) {
      if (err.response && err.response.status === 401) {
        alert(err.message);
      } else {
        console.error(err);
      }
    }
  }
  // Starts a timer after claiming a pack
  useEffect(() => {
    if (cooldown <= 0) {
      return
    }
    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [cooldown])

  return (
    <>
      <Header />
      <Navbar />
      <div className={classes.titlewrapper}>
        <p className={classes.title}>Catch A Pokemon</p>
        {pokeballs !== null ? (
         <p className={classes.flavor}>You have {pokeballs} pokeballs</p>
        ) : (
          <p className={classes.flavor}>You have 0 pokeballs</p>
        )}
        <p className={classes.flavor}>Earn 1 pokeball per day by completing 5 daily tasks!</p>
      </div>
      {cooldown > 0 ? (
        <div className={classes.cooldown}>
          <h3>Catch another Pokemon in {cooldown} seconds...</h3>
        </div>
      ) : (
        <button onClick={catchPokemon} className={classes.claimBtn}>
          Catch Pokemon
        </button>
      )}
      {claimed && reward && (
        <div className={classes.reward}>
          <h2>You got {reward.species_name}!</h2>
          <img src={reward.icon} alt={reward.species_name} />
          <p>Rarity: {reward.rarity}</p>
        </div>
      )}
    </>
  )
}

export default PackPage;
