import classes from "./UserProfile.module.css"
import AnonPfp from "../../assets/anon_pfp.jpg"
import ProfilePokemon from "../ProfilePokemon/ProfilePokemon";

type UserProfileProps = {
	onExit(): void;
}

function UserProfile({ onExit }: UserProfileProps) {
	return (
		<>
			<div className={classes.profileBox}>
				<div className={classes.exitButtonWrapper}>
					<div className={classes.exitButton} onClick={() => { onExit() }}>
						ⓧ
					</div>
				</div>
				<div className={classes.usernameWrapper}>
					<div className={classes.username}>
						USERNAME
					</div>
				</div>
				<div className={classes.pfpWrapper}>
					<img src={AnonPfp} alt="anon pfp" className={classes.pfp} />
					<div className={classes.changePfp} onClick={() => { }}>
						Change Profile Picture
					</div>
				</div>
				<div className={classes.pokeProfileWrapper}>
					<ProfilePokemon />
					<ProfilePokemon />
					<ProfilePokemon />
					<ProfilePokemon />
					<ProfilePokemon />
					<ProfilePokemon />
				</div>
			</div>
		</>
	)
}

export default UserProfile;
