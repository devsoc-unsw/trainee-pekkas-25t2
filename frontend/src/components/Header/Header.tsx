import classes from "./Header.module.css"
import { Link } from "react-router";

type HeaderProps = {
	showSignIn?: boolean;
};

function Header({ showSignIn }: HeaderProps) {
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
			</div>

			{/** Div for black, pokemon-esque border btw header and page content */}
			<div className={classes.bottomPad}></div>
		</>
	)
}

export default Header;
