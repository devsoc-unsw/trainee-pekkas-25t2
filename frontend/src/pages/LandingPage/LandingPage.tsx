import classes from "./LandingPage.module.css"

function LandingPage() {
    return (
        <div className={classes.wrapper}>
            <Header />
            <NavBar />
            <ActivePokemonCard/>
        </div>
    )
}

export default LandingPage
