import classes from "./FriendBox.module.css"
import anonPfp from "../../assets/anon_pfp.jpg"

type FriendBoxProps = {
	name: string;
	openProfile: () => void;
}

function FriendBox({ name, openProfile }: FriendBoxProps) {
	return (
		<>
			<div className={classes.friendBox} onClick={() => { openProfile() }}>
				<img src={anonPfp} alt="anon pfp" className={classes.friendIcon} />

				<p className={classes.friendName}>
					{name}
				</p>
			</div >
		</>
	)
}

export default FriendBox;
