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