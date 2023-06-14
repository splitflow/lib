export interface RootNode {
    [key: string]: ConfigurationNode
}

export interface ConfigurationNode {
    [optionName: string]: boolean
}