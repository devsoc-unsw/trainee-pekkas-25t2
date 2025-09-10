import { TypedRequest, TypedRequestQuery, TypedResponse } from "./requests"

export enum Rarities {
    Common = "common",
    Uncommon = "uncommon",
    Rare = "rare",
    Starter = "starter",
    Legendary = "legendary"
}

export interface createPokemonInstanceType {
    pokedexNum:number,
    level:number,
    trainerId:number
}

export interface pokemonIdBody {
    pokemonId:number
}

export interface pokemonRenameBody extends pokemonIdBody {
    newname:string
}