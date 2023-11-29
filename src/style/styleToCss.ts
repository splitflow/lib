import { clean, isNotEmpty } from '@splitflow/core/utils'
import {
    BackgroundNode,
    BorderNode,
    CornerNode,
    DefinitionNode,
    LayoutNode,
    PaddingNode,
    PositionNode,
    StyleNode,
    SizeNode,
    TypographyNode
} from './style'
import { Color } from './theme'

export class StyleToCSSVisitor {
    constructor(discriminator?: string) {
        this.discriminator = discriminator
    }

    discriminator: string

    root(root: StyleNode) {
        if (!root) return {}

        return Object.entries(root).reduce((rules, [definitionName, definition]) => {
            if (definitionName === 'type') return rules

            for (const [selectorText, style] of this.definition(definition)) {
                rules[selector(definitionName, selectorText, this.discriminator)] = style
            }
            return rules
        }, {})
    }

    definition(definition: DefinitionNode) {
        return ruleEntries([
            this.padding(definition.padding),
            this.corner(definition.corner),
            this.border(definition.border),
            this.background(definition.background),
            this.size(definition.size),
            this.typography(definition.typography),
            this.layout(definition.layout),
            this.position(definition.position)
        ])
    }

    *corner(corner: CornerNode) {
        yield* ruleEntry({
            'border-top-left-radius': property(corner && corner.topLeft, 'rem'),
            'border-top-right-radius': property(corner && corner.topRight, 'rem'),
            'border-bottom-left-radius': property(corner && corner.bottomLeft, 'rem'),
            'border-bottom-right-radius': property(corner && corner.bottomRight, 'rem'),
            overflow: property(corner && any(corner), () => 'hidden')
        })
    }

    *border(border: BorderNode) {
        yield* ruleEntry({
            'border-color': property(border && border.color, hsl),
            'border-width': property(border && border.tickness, 'rem'),
            'border-style': property(border && 'solid')
        })
    }

    *background(background: BackgroundNode) {
        yield* ruleEntry({
            'background-color': property(background && background.color, hsl)
        })
    }

    *padding(padding: PaddingNode) {
        yield* ruleEntry({
            'padding-top': property(padding && padding.top, 'rem'),
            'padding-bottom': property(padding && padding.bottom, 'rem'),
            'padding-left': property(padding && padding.left, 'rem'),
            'padding-right': property(padding && padding.right, 'rem')
        })
    }

    /**
     * Size is styled with min and max values to avoid conflicts with position
     */
    *size(size: SizeNode) {
        yield* ruleEntry({
            'min-width':
                property(size && size.minWidth, 'rem') || property(size && size.width, 'rem'),
            'max-width':
                property(size && size.maxWidth, 'rem') || property(size && size.width, 'rem'),
            'min-height':
                property(size && size.minHeight, 'rem') || property(size && size.height, 'rem'),
            'max-height':
                property(size && size.maxHeight, 'rem') || property(size && size.height, 'rem'),
            'aspect-ratio': property(size && size.aspectRatio, '/1')
        })
    }

    *typography(typography: TypographyNode) {
        yield* ruleEntry({
            'font-family': property(typography && typography.fontFamily),
            'font-size': property(typography && typography.fontSize, 'rem'),
            'font-weight': property(typography && typography.fontWeight),
            'font-style': property(typography && typography.fontStyle),
            'text-align': property(typography && typography.textAlign),
            'text-transform': property(typography && typography.textTransform),
            'text-decoration': property(typography && typography.textDecoration),
            color: property(typography && typography.color, hsl)
        })
    }

    *layout(layout: LayoutNode) {
        yield* ruleEntry({
            display: property(layout && 'flex'),
            'flex-direction': property(layout && layout.direction),
            'justify-content': property(layout && layout.mainAxisAlignment, (v) => {
                if (v === 'stretch') return 'flex-start'
                if (v === 'start' || v === 'end') return `flex-${v}`
                return v
            }),
            'align-items': property(layout && layout.crossAxisAlignment, (v) => {
                if (v === 'start' || v === 'end') return `flex-${v}`
                return v
            }),
            gap: property(layout && layout.spacing, 'rem')
        })

        yield* ruleEntry('> *', {
            'flex-grow': property(layout && layout.mainAxisAlignment, (v) =>
                v === 'stretch' ? '1' : null
            ),
            'flex-basis': property(layout && layout.mainAxisAlignment, (v) =>
                v === 'stretch' ? '0' : null
            ),
            'margin-left': property(layout && layout.direction, (v) =>
                v === 'column' ? '!unset' : null
            ),
            'margin-right': property(layout && layout.direction, (v) =>
                v === 'column' ? '!unset' : null
            ),
            'margin-top': property(layout && layout.direction, (v) =>
                v === 'row' ? '!unset' : null
            ),
            'margin-bottom': property(layout && layout.direction, (v) =>
                v === 'row' ? '!unset' : null
            ),
            width: property(layout && layout.direction, (v) => (v === 'column' ? '!unset' : null)),
            height: property(layout && layout.direction, (v) => (v === 'row' ? '!unset' : null))
        })
    }

    *position(position: PositionNode) {
        yield* ruleEntry({
            'margin-right': property(position && position.mainAxisAlignment, (v) =>
                v === 'start' || v === 'center' ? 'auto' : null
            ),
            'margin-left': property(position && position.mainAxisAlignment, (v) =>
                v === 'end' || v === 'center' ? 'auto' : null
            ),
            'margin-bottom': property(position && position.mainAxisAlignment, (v) =>
                v === 'start' || v === 'center' ? 'auto' : null
            ),
            'margin-top': property(position && position.mainAxisAlignment, (v) =>
                v === 'end' || v === 'center' ? 'auto' : null
            ),
            'flex-grow':
                property(position && position.mainAxisSize, () => '!unset') ||
                property(position && position.mainAxisAlignment, (v) =>
                    v === 'stretch' ? '1' : null
                ),
            'flex-basis': property(position && position.mainAxisSize, () => '!unset'),
            'align-self': property(position && position.crossAxisAlignment, (v) => {
                if (v === 'start' || v === 'end') return `flex-${v}`
                return v
            }),
            width: property(position && position.mainAxisSize, '%'),
            height: property(position && position.mainAxisSize, '%')
        })
    }
}

export function cssProperyValue(value: string) {
    if (value.charAt(0) === '!') {
        return [value.slice(1), 'important']
    }
    return [value]
}

function hsl(color: Color) {
    const h = typeof color[0] == 'string' ? `var(--${color[0].slice(1)}-color-h)` : color[0]
    const s = typeof color[1] == 'string' ? `var(--${color[1].slice(1)}-color-s)` : `${color[1]}%`
    const l = typeof color[2] == 'string' ? `var(--${color[2].slice(1)}-color-l)` : `${color[2]}%`
    const a = typeof color[3] == 'string' ? `var(--${color[3].slice(1)}-color-a)` : `${color[3]}%`
    return `hsl(${h}, ${s}, ${l}, ${a})`
}

function property(value, unit?: string)
function property(value, format: (val) => string)
function property(value, format: any) {
    if (value === null || value === undefined) return value
    if (typeof format === 'function') return format(value)
    if (format) return value + format
    return value + ''
}

function any(object: object) {
    let property
    for (let [, prop] of Object.entries(object)) {
        if (prop !== null && prop != undefined) return prop
        if (prop !== undefined) property = prop
    }
    return property
}

function selector(definitionName: string, selectorText: string, discriminator: string) {
    const [componentToken, elementToken] = definitionName.split('-')
    const [componentName, componentVariant] = componentToken.split(':')
    const [elementName, elementVariant] = elementToken.split(':')

    let selector = []

    if (elementName === 'root' && componentVariant) {
        selector.push(
            elementSelector(componentName, 'root', discriminator) +
                variantSelector(componentVariant)
        )
    } else if (componentVariant) {
        selector.push(
            elementSelector(componentName, 'root', discriminator) +
                variantSelector(componentVariant)
        )
        selector.push(
            elementSelector(componentName, elementName, discriminator) +
                variantSelector(elementVariant)
        )
    } else {
        selector.push(
            elementSelector(componentName, elementName, discriminator) +
                variantSelector(elementVariant)
        )
    }

    if (selectorText) {
        selector.push(selectorText)
    }

    return selector.join(' ')
}

function elementSelector(componentName: string, elementName: string, discriminator: string) {
    if (discriminator) return `.sf-${componentName}-${elementName}-${discriminator}`
    return `.sf-${componentName}-${elementName}`
}

function variantSelector(variantName: string) {
    if (variantName === 'hover') return ':hover'
    if (variantName === 'even') return ':nth-child(2n)'
    if (variantName === 'odd') return ':nth-child(2n+1)'
    if (variantName) return `.${variantName}`
    return ''
}

function ruleEntry(style: object): Generator<[string, object]>
function ruleEntry(selector: string, style: object): Generator<[string, object]>
function* ruleEntry(arg1: any, arg2?: object): Generator<[string, object]> {
    const selector = typeof arg1 === 'string' ? arg1 : null
    const style = clean(arg2 ?? arg1)
    if (isNotEmpty(style)) yield [selector, style]
}

function ruleEntries(entries: Generator<[string, object]>[]) {
    const result = new Map<string, object>()

    for (const entryGenerator of entries) {
        for (const [selector, style] of entryGenerator) {
            result.set(
                selector,
                result.has(selector) ? { ...result.get(selector), ...style } : style
            )
        }
    }
    return result.entries()
}
