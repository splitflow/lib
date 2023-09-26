import { ConfigNode } from "../config"
import { StyleNode, ThemeNode } from "../style"

export interface CreateDesignAction {
    type: 'create-design'
    designId?: string
}

export interface CreateThemeAction {
    type: 'create-theme'
    themeId?: string
}

export interface MergeNodeAction {
    type: 'merge-node'
    designId?: string
    style?: StyleNode
    theme?: ThemeNode
    config?: ConfigNode
}

export interface GetNodeAction {
    type: 'get-node'
    designId?: string
    style?: boolean
    theme?: boolean
    config?: boolean
}

export interface ResetNodeAction {
    type: 'reset-node'
    designId?: string
    styleChecksum?: string
    themeChecksum?: string
    configChecksum?: string
}