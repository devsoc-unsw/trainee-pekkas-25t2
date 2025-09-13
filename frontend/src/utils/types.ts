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