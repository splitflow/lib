import { Error } from "../gateway"

export interface GetAccessTokenAction {
    type: 'get-access-token'
}

export interface GetAccessTokenResult {
    accessToken?: string
    error?: Error<'wrong-credential'>
}

export const GetAccessTokenEndpoint = {
    actionType: 'get-access-token',
    pathname: '/get-access-token',
    subdomain: 'auth',
    getAction: (action: GetAccessTokenAction) => action
}