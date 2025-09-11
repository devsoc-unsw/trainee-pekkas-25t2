export enum Rarities {
    Common = "common",
    Uncommon = "uncommon",
    Rare = "rare",
    Starter = "starter",
    Legendary = "legendary"
}

export type createPokemonInstanceType = {
    pokedexNum:number,
    level:number,
    trainerId:number
}

export type pokemonIdBody = {
    pokemonId:number
}

export type pokemonRenameBody = {
    newname:string
}

export type pokemonIdParams = pokemonIdBody