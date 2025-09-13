import { useState } from "react";
import classes from "./FriendsPage.module.css"
import Header from "../../components/Header/Header"
import FriendList from "../../components/FriendList/FriendList"
import Navbar from "../../components/Navbar/Navbar"
import FriendProfile from "../../components/FriendProfile/FriendProfile"
import AddFriendSearchbar from "../../components/AddFriendSearchbar/AddFriendSearchbar";
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import type { UserProfileProps } from "../../utils/types";

function FriendsPage() {
	const [showProfile, setShowProfile] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState<UserProfileProps>();
	const [selectedFriendName, setSelectedFriendName] = useState<string>("");

	const friendNames = ["friend 1", "friend 2", "friend 3", "friend 4", "friend 5"];

	const handleSearch = async (username:string) => {
		try {
			const res = await axios.post(`${API_URL}/user/name`, { username });
			if (!res.data) {
				alert("No user found with that name");
				return;
			}
			console.log(res.data);
			setSelectedFriend(res.data);
			setShowProfile(true);
		} catch (err:any) {
			console.error(err);
			alert("error! please check the console!");
		}
	}
	return (
		<>
			<Header />
			{showProfile && <FriendProfile
				exit={() => setShowProfile(false)}
				name={selectedFriend?.username} />}
			<div className={classes.wrapper}>
				<AddFriendSearchbar onSearch={handleSearch}/>
				<FriendList
					openProfile={() => setShowProfile(true)}
					friendNames={friendNames}
					onSelectFriend={
						// get lifted state from friendlist (man idk how this works bruh but it just do)
						(name) => {
							setSelectedFriendName(name)
						}}
				/>
			</div>
			<Navbar />
		</>
	)
}

export default FriendsPage;
