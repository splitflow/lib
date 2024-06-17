import { ConfigNode } from '../config'
import { Error } from '../endpoint'
import { StyleNode, ThemeNode } from '../style'

export interface CreateDesignAction {
    type: 'create-design'
    accountId: string
    podType: string
    podId: string
    themeJson?: string
    styleJson?: string
    configJson?: string
}

export const CreateDesignEndpoint = {
    actionType: 'create-design',
    pathname: '/accounts/:accountId/create-design',
    subdomain: 'design',
    getAction: (action: CreateDesignAction) => action
}

export interface CreateThemeAction {
    type: 'create-theme'
    userId: string
    accountId?: string
}

export const CreateThemeEndpoint = {
    actionType: 'create-theme',
    pathname: '/users/:userId/create-theme',
    subdomain: 'design',
    getAction: (action: CreateThemeAction) => action
}

export interface GetDesignAction {
    type: 'get-design'
    accountId: string
    podType: string
    podId: string
    style?: boolean
    config?: boolean
}

export interface GetDesignResult {
    style?: StyleNode
    config?: ConfigNode
    error?: Error<'unknown-design'>
}

export const GetDesignEndpoint = {
    actionType: 'get-design',
    pathname: '/accounts/:accountId/:podType/:podId/design',
    subdomain: 'design',
    method: 'GET',
    authorization: false,
    getAction: (action: GetDesignAction) => action
}

export interface GetThemeAction {
    type: 'get-theme'
    accountId: string
}

export interface GetThemeResult {
    theme?: ThemeNode
    error?: Error<'unknown-theme'>
}

export const GetThemeEndpoint = {
    actionType: 'get-theme',
    pathname: '/accounts/:accountId/theme',
    subdomain: 'design',
    method: 'GET',
    authorization: false,
    getAction: (action: GetThemeAction) => action
}

export interface MergeDesignAction {
    type: 'merge-design'
    accountId: string
    podType: string
    podId: string
    style?: StyleNode
    config?: ConfigNode
}

export interface MergeDesignResult {
    error?: Error<'unknown-design'>
}

export const MergeDesignEndpoint = {
    actionType: 'merge-design',
    pathname: '/accounts/:accountId/:podType/:podId/merge-design',
    subdomain: 'design',
    getAction: (action: MergeDesignAction) => action
}

export interface MergeThemeAction {
    type: 'merge-theme'
    accountId: string
    theme: ThemeNode
}

export interface MergeThemeResult {
    error?: Error<'unknown-theme'>
}

export const MergeThemeEndpoint = {
    actionType: 'merge-theme',
    pathname: '/accounts/:accountId/merge-theme',
    subdomain: 'design',
    getAction: (action: MergeThemeAction) => action
}

export interface ResetDesignAction {
    type: 'reset-design'
    accountId: string
    podType: string
    podId: string
    styleChecksum?: string
    configChecksum?: string
}

export interface ResetDesignResult {
    error?: Error<'unknown-design' | 'invalid-checksum'>
}

export const ResetDesignEndpoint = {
    actionType: 'reset-design',
    pathname: '/accounts/:accountId/:podType/:podId/reset-design',
    subdomain: 'design',
    getAction: (action: ResetDesignAction) => action
}

export interface ResetThemeAction {
    type: 'reset-theme'
    accountId: string
    themeChecksum?: string
}

export interface ResetThemeResult {
    error?: Error<'unknown-theme' | 'invalid-checksum'>
}

export const ResetThemeEndpoint = {
    actionType: 'reset-theme',
    pathname: '/accounts/:accountId/reset-theme',
    subdomain: 'design',
    getAction: (action: ResetThemeAction) => action
}
