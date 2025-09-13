import type { FriendPokemonPreviewProps } from '../../utils/types'
import classes from "./FriendPokemonPreview.module.css"

function FriendPokemonPreview({ id, icon, nickname, level, username, species }: FriendPokemonPreviewProps) {
   if (!id && !icon && !nickname && !level && !username && !species) {
        return  (
            <div className={classes.pokemonCardText}>
                <div className={classes.wrapper}>
                    <p className={classes.text}>No pokemon displayed!</p>
                </div>
            </div>
        )
    }

    if (!id && !icon && !nickname && !level && !species && username) {
        return  (
            <div className={classes.pokemonCardText}>
                <div className={classes.wrapper}>
                    <p className={classes.text}>{username} has no active pokemon</p>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.pokemonCard}>
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
        </div>
        )

}

export default FriendPokemonPreview