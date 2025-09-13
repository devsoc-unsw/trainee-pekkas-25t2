import classes from "./FriendList.module.css"
import FriendBox from "../FriendBox/FriendBox";
import type { FriendPokemonPreviewProps } from "../../utils/types";

type FriendListProps = {
	openProfile: () => void;
	friendNames: Array<FriendPokemonPreviewProps>;
	onSelectFriend: (friend: FriendPokemonPreviewProps) => void;
}

function FriendList({ friendNames, onSelectFriend }: FriendListProps) {
	return (
		<>
			<div className={classes.friendList}>
				<div>
					{friendNames.map((friend) =>
						<FriendBox key={friend.id} name={friend.username} onClick={() => {
							// lift state back up to FriendsPage
							onSelectFriend(friend)
						}} />
					)}
				</div>
			</div >
		</>
	)
}

export default FriendList;
