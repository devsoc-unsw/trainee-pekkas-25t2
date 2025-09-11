import classes from "./FriendList.module.css"
import FriendBox from "../FriendBox/FriendBox";

type FriendListProps = {
	openProfile: () => void;
	friendNames: Array<string>;
	onSelectFriend: (name: string) => void;
}

function FriendList({ openProfile, friendNames, onSelectFriend }: FriendListProps) {
	return (
		<>
			<div className={classes.friendList}>
				<div>
					{friendNames.map((name) =>
						<FriendBox name={name} openProfile={() => {
							openProfile();
							// lift state back up to FriendsPage
							onSelectFriend(name)
						}} />
					)}
				</div>
			</div >
		</>
	)
}

export default FriendList;
