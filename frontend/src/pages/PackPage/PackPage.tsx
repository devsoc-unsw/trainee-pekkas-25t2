import Header from "../../components/Header/Header"
import Navbar from "../../components/Navbar/Navbar"
import classes from "./PackPage.module.css"
import { useState } from 'react';
import { useNavigate } from "react-router"
import { pokemonData } from "../../pokemonData"

function PackPage() {
  const [claimed, setClaimed] = useState(false)
  const [reward, setReward] = useState<any | null>(null)

  const rarityWeights = {
    common: 60,
    uncommon: 25,
    rare: 10,
    starter: 4,
    legendary: 1
  }
  
  const chooseRarity = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    console.log(num)
    if (num >= 1 && num <= 60) {
      return "common"
    }
    if (num >= 61 && num <= 85) {
      return "uncommon"
    }
    if (num >= 86 && num <= 95) {
      return "rare"
    }
    if (num >= 96 && num <= 99) {
      return "starter"
    }
    else return "legendary"
  }

  // Function to claim a Pokémon
  const claimPack = () => {
    if (claimed) return

    const chosenRarity = chooseRarity()
    const filtered = pokemonData.filter(
      (p) => p.rarity === chosenRarity
    )

    // If no Pokémon with that rarity, fallback to common pool
    const pool = filtered.length > 0 ? filtered : pokemonData.filter(p => p.rarity === "common")

    const chosen = pool[Math.floor(Math.random() * pool.length)]

    setReward(chosen)
    setClaimed(true)
  }

  return (
    <>
      <Header />
      Hello from PackPage
      <Navbar />
      <div className={classes.title}>
        CLAIM YOUR DAILY PACK
      </div>
      {!claimed ? (
        <button onClick={claimPack} className={classes.claimBtn}>
          Open Pack
        </button>
      ) : (
        reward && (
          <div className={classes.reward}>
            <h2>You got {reward.species_name}!</h2>
            <img src={reward.icon} alt={reward.species_name} />
            <p>Rarity: {reward.rarity}</p>
          </div>
        )
      )}
      
    </>
  )
}

export default PackPage;
