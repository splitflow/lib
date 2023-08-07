export interface SplitflowConfigDef {
    [optionName: string]: ConfigurationNode
}

export interface ConfigNode {
    [key: string]: ConfigurationNode
}

export interface ConfigurationNode {
    enabled?: boolean
    property?: PropertyNode
    content?: ContentNode
    action?: ActionNode
}

export interface PropertyNode {
    [propertyName: string]: unknown
}

export interface ContentNode {
    text?: string
    svg?: string
    img?: string
}

export interface ActionNode {
    text?: string
    svg?: string
    img?: string
}