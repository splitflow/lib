import { sort } from '@splitflow/core/utils'
import { ConfigNode, SplitflowConfigDef } from './config'

export function defToConfig(componentName: string, configDef: SplitflowConfigDef): ConfigNode {
    if (!configDef) return undefined

    const fragment = {}
    for (const [optionName, configuration] of Object.entries(configDef)) {
        fragment[`${componentName}-${optionName}`] = configuration
    }
    return fragment
}

export function* configToDef(root: ConfigNode): Generator<[string, SplitflowConfigDef]> {
    if (!root) return

    let configDef: SplitflowConfigDef | null = null
    let configComponentName: string | null = null

    for (const [configurationName, configuration] of Object.entries(sort(root))) {
        const [componentName, optionName] = configurationName.split('-')

        if (configDef && configComponentName !== componentName) {
            yield [configComponentName!, configDef]

            configDef = null
            configComponentName = null
        }

        configComponentName = componentName
        configDef ??= {}
        configDef[optionName] = configuration
    }

    if (configDef) {
        yield [configComponentName!, configDef]
    }
}
