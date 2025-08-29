import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard";
import FriendBox from "../../components/FriendBox/FriendBox"

const example_pokemon_instance_data = {
  level: 36,
  exp_lvl: 50,
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
    </div>
  )
}

export default FriendsPage;