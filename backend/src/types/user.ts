export type loginUserBody = {
    username: string,
    password: string
}

export type createUserBody =  loginUserBody & {
    email: string
}