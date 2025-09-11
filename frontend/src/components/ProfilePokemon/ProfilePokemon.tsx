import classes from "./ProfilePokemon.module.css"

// Probably put a prop to tell component what pokemon to display
function ProfilePokemon() {
	return (
		<>
			<div className={classes.imgBox}>
				<img alt="poke img" />
			</div>
		</>
	)
}

export default ProfilePokemon
