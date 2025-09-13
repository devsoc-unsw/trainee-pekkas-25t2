import { useState } from "react";
import classes from "./Header.module.css"
import { Link } from "react-router";
import UserProfile from "../UserProfile/UserProfile";
import UserIcon from "../../assets/user_profile_icon.png"

type HeaderProps = {
	showSignIn?: boolean;
};

function Header({ showSignIn }: HeaderProps) {
	const [showProfile, setShowProfile] = useState(false);

	return (
		<>
			<div className={classes.header}>
				<h1 className={classes.headerText}>
					HABITMON
				</h1>
				{showSignIn &&
					<div className={classes.signIn}>
						Already have an account? <Link to="/login">Sign in</Link>
					</div>}

				{/* if not to show sign in, show user profile button */}
				{!showSignIn &&
					<img
						src={UserIcon}
						alt="user icon"
						className={classes.userProfileButton}
						onClick={() => { setShowProfile(true) }}
					/>}
			</div>

			{/** Div for black, pokemon-esque border btw header and page content */}
			<div className={classes.bottomPad}></div>

			{showProfile && <UserProfile onExit={() => { setShowProfile(false) }} />}
		</>
	)
}

export default Header;
