export interface TokenPayload {
    name?: any
    email?: null
    password?: null
    confirm_password?: null
}

export interface TokenReponse {
    token: string;
}

export interface UserDetail {
    name?: string;
    email?: string;
    password?: string
    exp: number
    iat: number
}

export interface info {
    name: any,
    email: any,
    verified: any
}
