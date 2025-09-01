import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard";
import FriendBox from "../../components/FriendBox/FriendBox"
import Navbar from "../../components/Navbar/Navbar";

const example_pokemon_instance_data = {
  level: 36,
  exp_lvl: 70,
  nickname: "charizard",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  type: ["fire", "flying"]
}

function FriendsPage() {
  return (
    <div>
      Hello from FriendPage
      <FriendBox></FriendBox>
      <ActivePokemonCard data={example_pokemon_instance_data}/>
      <Navbar/>
    </div>
  )
}

export default FriendsPage;