import { Error } from "../gateway"

export interface GetAccountAction {
    type: 'get-account'
    accountId?: string
    email?: string
}

export interface GetAccountResult {
    account?: Account
    error?: Error<'not-found'>
}

export interface CreateAccountAction {
    type: 'create-account'
    email?: string
}

export interface CreateAccountResult {
    account: Account
    error?: Error
}

export interface Account {
    accountId: string
    email: string
}