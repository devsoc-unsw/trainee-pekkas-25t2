import classes from "./LandingPage.module.css"
import Header from "../../components/Header/Header"
import LandingPageBanner from "../../assets/landing_page_banner.png"
import { useNavigate } from "react-router"

function LandingPage() {
	const navigate = useNavigate();

	return (
		<>
			<Header showSignIn={true} />
			<div className={classes.title}>
				<header>
					HABITMON
				</header>
			</div>
			<div className={classes.bannerWrapper}>
				<img className={classes.banner} src={LandingPageBanner} alt="Landing page banner" />
			</div>
			<div className={classes.subtitle}>
				<p>
					Gamifying productivity... now with Pokemon™!
				</p>
			</div>
			<div className={classes.startButtonWrapper}>
				<div className={classes.startButton} onClick={() => navigate("register")}>
					Get started
				</div>
			</div >
		</>
	)
}

export default LandingPage
