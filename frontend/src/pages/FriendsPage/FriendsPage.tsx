import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard";
import FriendBox from "../../components/FriendBox/FriendBox"

const example_pokemon_instance_data = {
  level: 3,
  exp_lvl: 50,
  nickname: "Pikachu",
  icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png"
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