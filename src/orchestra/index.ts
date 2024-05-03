import { Editor } from '../editor'
import { Error } from '../endpoint'
import { App, Account } from '../account'

export interface CreateAccountAction {
    type: 'create-account'
    accountId: string
    userId: string
    name: string
}

export interface CreateAccountResult {
    account?: Account
    error?: Error
}

export const CreateAccountEndpoint = {
    actionType: 'create-account',
    pathname: '/users/:userId/create-account',
    subdomain: 'orca',
    getAction: (action: CreateAccountAction) => action
}

export interface CreateAppAction {
    type: 'create-app'
    accountId: string
    appId: string
    name: string
}

export interface CreateAppResult {
    app?: App
    error?: Error
}

export const CreateAppEndpoint = {
    actionType: 'create-app',
    pathname: '/accounts/:accountId/create-app',
    subdomain: 'orca',
    getAction: (action: CreateAppAction) => action
}

export interface CreateEditorAction {
    type: 'create-editor'
    accountId: string
    editorId: string
    name: string
    docJson?: string
    styleJson?: string
    configJson?: string
}

export const CreateEditorAction = {
    schema: {
        type: 'object',
        properties: {
            accountId: { type: 'string' },
            name: { type: 'string', minLength: 3 }
        },
        required: ['accountId', 'name']
    }
}

export interface CreateEditorResult {
    editor?: Editor
    error?: Error
}

export const CreateEditorEndpoint = {
    actionType: 'create-editor',
    pathname: '/accounts/:accountId/create-editor',
    subdomain: 'orca',
    getAction: (action: CreateEditorAction) => action
}

export interface CreateUserAction {
    type: 'create-user'
    email?: string
}
