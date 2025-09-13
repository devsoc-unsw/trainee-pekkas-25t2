export type UserProfileProps = {
    id: number,
    username:string,
    icon: string,
    featured_pokemon?:null
}

export type FriendPokemonPreviewProps = {
    id?: number|null,
    nickname?: string|null,
    level?: number|null,
    icon?: string|null,
    username: string|null,
    species?: string|null
}

export type Pokemon = {
	"id":number|null,
	"trainerId": number|null,
	"level": number|null,
	"exp_lvl": number|null,
	"nickname": string|null,
	"speciesId": number|null
}

export type PokemonSpecies = {
	"pokedex_number": number|null,
	"species_name": string|null,
	"primary_type": string|null,
	"secondary_type": string|null,
	"level_to_evolve": number|null,
	"evolves_from_id": number|null,
	"icon": string|null,
	"base_pokemon": boolean|null,
	"rarity": string|null
}