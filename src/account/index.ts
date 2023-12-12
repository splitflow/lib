import { Error } from "../gateway"

export interface CreateAccountAction {
    type: 'create-account'
    memberId: string
    name: string
}

export interface CreateAccountResult {
	account?: Account
}

export interface GetAccountAction {
    type: 'get-account'
    memberId: string
    name: string
}

export interface GetAccountResult {
	account?: Account
    error?: Error<'not-found'>
}

export interface CreateAppAction {
    type: 'create-app'
    appId: string
    accountId?: string
    name: string
}

export interface CreateAppResult {
    app?: App
    error?: Error<'unknown-account'>
}

export interface CreateModuleAction {
    type: 'create-module'
    moduleId: string
    name: string
    accountId?: string
    memberId?: string
    accountName?: string
}

export interface CreateModuleResult {
    module?: Module
    error?: Error<'unknown-account'>
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