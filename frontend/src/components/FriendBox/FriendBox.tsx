import classes from "./FriendBox.module.css"
import anonPfp from "../../assets/anon_pfp.jpg"

type FriendBoxProps = {
	name: string|null;
	onClick: () => void;
}

function FriendBox({ name, onClick }: FriendBoxProps) {
	return (
		<>
			<div className={classes.friendBox} onClick={onClick}>
				<img src={anonPfp} alt="anon pfp" className={classes.friendIcon} />

				<p className={classes.friendName}>
					{name}
				</p>
			</div >
		</>
	)
}

export default FriendBox;
