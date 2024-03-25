import { Error } from '../endpoint'

export interface AuthorizeDeviceAction {
    type: 'authorize-device'
    clientId: string
    accountId: string
}

export interface AuthorizeDeviceResult {
    deviceCode?: string
    userCode?: string
    verificationUri?: string
    verificationUriComplete?: string
    error?: Error<'unknown-client'>
}

export const AuthorizeDeviceEndpoint = {
    actionType: 'authorize-device',
    pathname: '/oauth/authorize-device',
    subdomain: 'auth',
    method: 'POST',
    authorization: false,
    getAction: (action: AuthorizeDeviceAction) => action
}

export interface GetAccessTokenAction {
    type: 'get-access-token'
    deviceCode?: string
    refreshToken?: string
}

export interface GetAccessTokenResult {
    accessToken?: string
    refreshToken?: string
    error?: Error<'authorization-pending' | 'expired-token'>
}

export const GetAccessTokenEndpoint = {
    actionType: 'get-access-token',
    pathname: '/oauth/access-token',
    subdomain: 'auth',
    method: 'GET',
    authorization: false,
    credentials: true,
    getAction: (action: GetAccessTokenAction) => action
}

export interface SignInAction {
    type: 'sign-in'
    email: string
    password: string
}

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
    credentials: true,
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
    credentials: true,
    getAction: (action: SignUpAction) => action
}

export interface LogoutAction {
    type: 'logout'
}

export const LogoutEndpoint = {
    actionType: 'logout',
    pathname: '/logout',
    subdomain: 'auth',
    authorization: false,
    credentials: true,
    getAction: (action: LogoutAction) => action
}

export interface GetAuthAction {
    type: 'get-auth'
}

export interface GetAuthResult {
    user?: User
    client?: Client
}

export const GetAuthEndpoint = {
    actionType: 'get-auth',
    pathname: '/auth',
    subdomain: 'auth',
    method: 'GET',
    authorization: false,
    credentials: true,
    getAction: (action: GetAuthAction) => action
}

export interface GetDeviceAuthAction {
    type: 'get-device-auth'
    userCode?: string
}

export interface GetDeviceAuthResult {
    userDevice?: UserDevice
    error?: Error<'unknown-user-code'>
}

export const GetDeviceAuthEndpoint = {
    actionType: 'get-device-auth',
    pathname: '/device-auth',
    subdomain: 'auth',
    method: 'GET',
    getAction: (action: GetDeviceAuthAction) => action
}

export interface GrantDeviceAuthAction {
    type: 'grant-device-auth'
    accountId: string
    userCode: string
}

export interface GrantDeviceAuthResult {
    error?: Error<'unknown-user-code'>
}

export const GrantDeviceAuthEndpoint = {
    actionType: 'grant-device-auth',
    pathname: '/accounts/:accountId/grant-device-auth',
    subdomain: 'auth',
    getAction: (action: GrantDeviceAuthAction) => action
}

export interface GrantUserAuthAction {
    type: 'grant-user-auth'
    accountId: string
    userId: string
    role: string
}

export interface GrantUserAuthResult {
    error?: Error<'unknown-user'>
}

export const GrantUserAuthEndpoint = {
    actionType: 'grant-user-auth',
    pathname: '/accounts/:accountId/grant-user-auth',
    subdomain: 'auth',
    getAction: (action: GrantUserAuthAction) => action
}

export interface GrantSuperuserAuthAction {
    type: 'grant-superuser-auth'
    accountId: string
    userId: string
}

export interface GrantSuperuserAuthResult {
    error?: Error<'unknown-user'>
}

export const GrantSuperuserAuthEndpoint = {
    actionType: 'grant-superuser-auth',
    pathname: '/users/:userId/grant-superuser-auth',
    subdomain: 'auth',
    getAction: (action: GrantSuperuserAuthAction) => action
}

export interface User {
    userId: string
    email: string
}

export interface Client {
    clientId: string
    name: string
}

export interface UserDevice {
    accountId: string
    userCode: string
    name: string
}
