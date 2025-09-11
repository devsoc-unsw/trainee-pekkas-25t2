import { useState } from "react";
import classes from "./FriendsPage.module.css"
import Header from "../../components/Header/Header"
import FriendList from "../../components/FriendList/FriendList"
import Navbar from "../../components/Navbar/Navbar"
import FriendProfile from "../../components/FriendProfile/FriendProfile"
import AddFriendSearchbar from "../../components/AddFriendSearchbar/AddFriendSearchbar";

function FriendsPage() {
	const [showProfile, setShowProfile] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState<string>("");

	const friendNames = ["friend 1", "friend 2", "friend 3", "friend 4", "friend 5"];

	return (
		<>
			<Header />
			{showProfile && <FriendProfile
				exit={() => setShowProfile(false)}
				name={selectedFriend} />}
			<div className={classes.wrapper}>
				<AddFriendSearchbar />
				<FriendList
					openProfile={() => setShowProfile(true)}
					friendNames={friendNames}
					onSelectFriend={
						// get lifted state from friendlist (man idk how this works bruh but it just do)
						(name) => {
							setSelectedFriend(name)
						}}
				/>
			</div>
			<Navbar />
		</>
	)
}

export default FriendsPage;
