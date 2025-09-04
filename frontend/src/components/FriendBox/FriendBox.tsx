import classes from "./FriendBox.module.css"

function FriendBox() {
	return (
		<>
			<div className={classes.friendBox}>
				<div className={classes.friendIcon}></div>
				<p className={classes.friendName}>
					Friend Name
				</p>
			</div >
		</>
	)
}

export default FriendBox;
