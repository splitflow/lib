import { ConfigNode } from "../config"
import { Error } from "../gateway"
import { StyleNode, ThemeNode } from "../style"

export interface CreateDesignAction {
    type: 'create-design'
    designId?: string
    styleJsonNode?: string
    configJsonNode?: string
}

export interface CreateThemeAction {
    type: 'create-theme'
    themeId?: string
}

export interface MergeNodeAction {
    type: 'merge-node'
    designId?: string
    styleNode?: StyleNode
    themeNode?: ThemeNode
    configNode?: ConfigNode
}

export interface MergeNodeResult {
    error?: Error<'not-found'>
}

export interface GetNodeAction {
    type: 'get-node'
    designId?: string
    style?: boolean
    theme?: boolean
    config?: boolean
}

export interface GetNodeResult {
    node?: StyleNode | ThemeNode | ConfigNode
    error?: Error<'not-found'>
}

export interface ResetNodeAction {
    type: 'reset-node'
    designId?: string
    styleChecksum?: string
    themeChecksum?: string
    configChecksum?: string
}

export interface ResetNodeResult {
    error?: Error<'not-found' | 'invalid-checksum'>
}