export interface RootNode {
    [key: string]: ConfigurationNode
}

export interface ConfigurationNode {
    property?: PropertyNode
    content?: ContentNode
    action?: ActionNode
}

export interface PropertyNode {
    enabled?: boolean
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