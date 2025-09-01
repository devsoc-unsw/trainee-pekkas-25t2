//JUST FILLER SO THAT DIRECTORIES ARE PUSHED UP
import NavBar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import classes from "./LandingPage.module.css"
import React from 'react'
import ActivePokemonCard from "../../components/ActivePokemonCard/ActivePokemonCard"

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
