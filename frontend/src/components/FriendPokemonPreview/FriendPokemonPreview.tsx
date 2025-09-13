import React from 'react'
import type { FriendPokemonPreviewProps } from '../../utils/types'
import classes from "./FriendPokemonPreview.module.css"
import Card from '../Card/Card'
function FriendPokemonPreview({ icon, nickname, level, username, species }: FriendPokemonPreviewProps) {
   if (!icon && !nickname && !level && !username && !species) {
        return  (
            <div className={classes.textWrapper}>
                <p className={classes.text}>No Pokemon Displayed!</p>
            </div>
        )
    }

    if (!icon && !nickname && !level && !species && username) {
        return  (
            <div className={classes.textWrapper}>
                <p className={classes.text}>{username} has no active pokemon</p>
            </div>
        )
    }

    return (
        <Card className={classes.pokemonCard}>
            <div className={classes.wrapper}>
                <div className={classes.trainer}>
                    <p className={classes.trainertext}>{username}'s {species}</p>
                </div>
                <div className={classes.pokemonInfo}>
                    <div className={classes.pokemonContainer}>
                        <div className={classes.pokemonProfileContainer}>
                            <img src={icon ?? ""} alt={`image of ${nickname}`} className={classes.pokemonIcon} />
                        </div>
                        <div
                        className={classes.pokemonLevelContainer}
                        >
                        {level}
                        </div>
                    </div>
                    <div className={classes.pokemonNameContainer}>
                        <div>
                        <h1 className={classes.pokemonName}>{nickname}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        )

}

export default FriendPokemonPreview