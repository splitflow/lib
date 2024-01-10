import {  Error } from '../endpoint'

export interface GetAccessTokenAction {
    type: 'get-access-token'
}

export interface GetAccessTokenResult {
    accessToken?: string
    error?: Error<'wrong-credential'>
}

export const GetAccessTokenEndpoint = {
    actionType: 'get-access-token',
    pathname: '/access-token',
    subdomain: 'auth',
    method: 'GET',
    getAction: (action: GetAccessTokenAction) => action
}

export interface SignInAction {
    type: 'sign-in'
    email: string
    password: string
}

export { default as SignInActionSchema } from './sign-in-action.json'
export { default as SignInActionValidator } from './sign-in-action.schema.json'

export const SignInAction = {
    schema: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 3 }
        },
        required: ['email', 'password']
    }
}

export interface SignInResult {
    user?: User
    error?: Error<'wrong-credential'>
}

export const SignInEndpoint = {
    actionType: 'sign-in',
    pathname: '/sign-in',
    subdomain: 'auth',
    authorization: false,
    getAction: (action: SignInAction) => action
}

export interface SignUpAction {
    type: 'sign-up'
    email: string
    password: string
}

export const SignUpAction = {
    schema: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 3 }
        },
        required: ['email', 'password']
    }
}

export interface SignUpResult {
    user?: User
    error?: Error<'user-exists'>
}

export const SignUpEndpoint = {
    actionType: 'sign-up',
    pathname: '/sign-up',
    subdomain: 'auth',
    authorization: false,
    getAction: (action: SignUpAction) => action
}

export interface GetUserAction {
    type: 'get-user'
}

export interface GetUserResult {
    user?: User
}

export const GetUserEndpoint = {
    actionType: 'get-user',
    pathname: '/user',
    subdomain: 'auth',
    method: 'GET',
    authorization: false,
    getAction: (action: GetUserAction) => action
}

export interface User {
    userId: string
}
