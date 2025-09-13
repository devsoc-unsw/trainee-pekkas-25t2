import classes from "./FriendProfile.module.css"
import anonPfp from "../../assets/anon_pfp.jpg"
import ProfilePokemon from "../ProfilePokemon/ProfilePokemon"

type FriendProfileProps = {
	exit: () => void;
	name: string|undefined;
}

function FriendProfile({ exit, name }: FriendProfileProps) {
	return (
		<>
			<div className={classes.profileBox}>
				<div className={classes.exitButtonWrapper}>
					<div className={classes.exitButton} onClick={() => { exit() }}>
						ⓧ
					</div>
				</div>
				<div className={classes.nameWrapper}>
					<div className={classes.name}>
						{name}
					</div>
				</div>
				<div className={classes.bodyWrapper}>
					<div className={classes.userSection}>
						<img src={anonPfp} alt="anon pfp" className={classes.pfp} />
						<div className={classes.addFriendButton}>
							Add Friend
						</div>
					</div>
					<div className={classes.pokeSection}>
						<div className={classes.pokeSectionRow}>
							<ProfilePokemon />
							<ProfilePokemon />
							<ProfilePokemon />
						</div>
						<div className={classes.pokeSectionRow}>
							<ProfilePokemon />
							<ProfilePokemon />
							<ProfilePokemon />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default FriendProfile
