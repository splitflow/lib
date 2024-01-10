import { Error } from "../endpoint"

export interface CreateAccountAction {
    type: 'create-account'
    accountId: string
    userId: string
    name: string
}

export interface CreateAccountResult {
	account?: Account
}

export const CreateAccountEndpoint = {
    actionType: 'create-account',
    pathname: '/create-account',
    subdomain: 'account',
    getAction: (action: CreateAccountAction) => action
}

export interface GetAccountAction {
    type: 'get-account'
    accountId: string
}

export interface GetAccountResult {
	account?: Account
    error?: Error<'not-found'>
}

export const GetAccountEndpoint = {
    actionType: 'get-account',
    pathname: '/accounts/:accountId',
    subdomain: 'account',
    getAction: (action: GetAccountAction) => action
}

export interface ListAccountsAction {
    type: 'list-accounts'
    userId: string
}

export interface ListAccountsResult {
	accounts?: Account[]
    error?: Error<'not-found'>
}

export const ListAccountsEndpoint = {
    actionType: 'list-accounts',
    pathname: '/users/:userId/accounts',
    subdomain: 'account',
    getAction: (action: ListAccountsAction) => action
}

export interface CreateAppAction {
    type: 'create-app'
    accountId: string
    appId: string
    name: string
}

export interface CreateAppResult {
    app?: App
    error?: Error<'unknown-account'>
}

export const CreateAppEndpoint = {
    actionType: 'create-app',
    pathname: '/accounts/:accountId/create-app',
    subdomain: 'account',
    getAction: (action: CreateAppAction) => action
}

export interface CreateModuleAction {
    type: 'create-module'
    accountId?: string
    moduleId: string
    name: string
}

export interface CreateModuleResult {
    module?: Module
    error?: Error<'unknown-account'>
}

export const CreateModuleEndpoint = {
    actionType: 'create-module',
    pathname: '/accounts/:accountId/create-module',
    subdomain: 'account',
    getAction: (action: CreateModuleAction) => action
}

export interface Account {
	accountId: string
	name: string
}

export interface App {
	appId: string
	name: string
}

export interface Module {
	moduleId: string
	name: string
}