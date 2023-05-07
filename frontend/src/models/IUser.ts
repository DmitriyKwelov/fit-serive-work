export interface IUser{
    username: string;
    id: string;
    email: string;
    role: string;
    avatarUrl: string;
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

export interface IUserPayload{
    accessToken: string
    refreshToken: string
    user: IUser
}

export interface IUserPromise {
    payload: IUserPayload
    type: string
}