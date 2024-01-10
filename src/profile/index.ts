import { Error } from "../endpoint"

export interface GetProfileAction {
    type: 'get-profile'
    userId?: string
    email?: string
}

export interface GetProfileResult {
    profile?: Profile
    error?: Error<'not-found'>
}

export const GetProfileEndpoint = {
    actionType: 'get-profile',
    pathname: '/user/:userId/profile',
    subdomain: 'profile',
    getAction: (action: GetProfileAction) => action
}

export interface CreateProfileAction {
    type: 'create-profile'
    email?: string
}

export interface CreateProfileResult {
    profile: Profile
    error?: Error
}

export const CreateProfileEndpoint = {
    actionType: 'create-profile',
    pathname: '/createProfile',
    subdomain: 'profile',
    getAction: (action: CreateProfileAction) => action
}

export interface Profile {
    userId: string
    email: string
}