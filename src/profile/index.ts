import { Error } from "../gateway"

export interface GetProfileAction {
    type: 'get-profile'
    userId?: string
    email?: string
}

export interface GetProfileResult {
    profile?: Profile
    error?: Error<'not-found'>
}

export interface CreateProfileAction {
    type: 'create-profile'
    email?: string
}

export interface CreateProfileResult {
    profile: Profile
    error?: Error
}

export interface Profile {
    userId: string
    email: string
}