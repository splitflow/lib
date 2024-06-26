import { number, enumeration } from '@splitflow/core/definition'
import { Color } from './theme'

export interface SplitflowStyleDef {
    [definitionName: string]: DefinitionNode | VariantsDef
}

export interface VariantsDef {
    [variantPattern: `@:${string}` | `:${string}`]: DefinitionNode
}

export interface StyleNode {
    type: 'fragment' | 'snapshot'
    [definitionName: string]: any
}

export interface DefinitionNode {
    padding?: PaddingNode
    corner?: CornerNode
    border?: BorderNode
    background?: BackgroundNode
    size?: SizeNode
    typography?: TypographyNode
    layout?: LayoutNode
    position?: PositionNode
    fill?: FillNode
    stroke?: StrokeNode
}

export interface PaddingNode {
    top?: number
    left?: number
    bottom?: number
    right?: number
}

export interface CornerNode {
    topLeft?: number
    topRight?: number
    bottomLeft?: number
    bottomRight?: number
}

export interface BorderNode {
    color?: Color
    tickness?: number
}

export interface BackgroundNode {
    color?: Color
}

export interface SizeNode {
    width?: number
    minWidth?: number
    maxWidth?: number
    height?: number
    minHeight?: number
    maxHeight?: number
    aspectRatio?: number
}

export interface TypographyNode {
    fontFamily?: string
    fontWeight?: number
    fontStyle?: string
    fontSize?: number
    color?: Color
    textAlign?: string
    textAnchor?: string //svg
    textTransform?: string
    textDecoration?: string
}

export interface LayoutNode {
    direction: 'row' | 'column'
    mainAxisAlignment:
        | 'start'
        | 'end'
        | 'center'
        | 'stretch'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
    crossAxisAlignment: 'start' | 'end' | 'center' | 'stretch'
    spacing: number
}

export interface PositionNode {
    mainAxisAlignment: 'start' | 'end' | 'center' | 'stretch' | 'shrink'
    crossAxisAlignment: 'start' | 'end' | 'center' | 'stretch'
    mainAxisSize?: number
}

export interface FillNode {
    color?: Color
}

export interface StrokeNode {
    color?: Color
    width?: number
    dashArray?: number
    lineCap?: 'round'
    lineJoin?: 'round'
}

export const StyleSchema = {
    padding: {
        all: number({ min: 0, max: 100, step: 1, precision: 1, unit: 'rem', nullable: true })
    },
    corner: {
        all: number({ min: 0, max: 10, step: 0.25, precision: 2, unit: 'rem', nullable: true })
    },
    border: {
        tickness: number({ min: 0, max: 10, step: 0.1, precision: 1, unit: 'rem', nullable: true })
    },
    size: {
        all: number({ min: 0, max: 100, step: 1, precision: 2, unit: 'rem', nullable: true }),
        aspectRatio: number({
            min: 0,
            max: 10,
            step: 0.1,
            precision: 1,
            unit: '/1',
            nullable: true
        })
    },
    typography: {
        fontSize: number({
            min: 0,
            max: 10,
            step: 0.25,
            precision: 2,
            unit: 'rem',
            nullable: true
        }),
        fontWeight: enumeration([null, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        fontStyle: enumeration([null, 'normal', 'italic']),
        textTransform: enumeration([null, 'none', 'uppercase', 'lowercase', 'capitalize']),
        textAlign: enumeration([null, 'start', 'end', 'center', 'justify']),
        textAnchor: enumeration([null, 'start', 'end', 'middle']), // svg
        textDecoration: enumeration([null, 'underline', 'overline', 'line-through']) // none has no effect and so is not proposed
    },
    layout: {
        direction: enumeration(['row', 'column']),
        mainAxisAlignment: enumeration([
            'start',
            'end',
            'center',
            'stretch',
            'space-between',
            'space-around',
            'space-evenly'
        ]),
        crossAxisAlignment: enumeration(['start', 'end', 'center', 'stretch']),
        spacing: number({ min: 0, max: 100, step: 1, precision: 2, unit: 'rem' })
    },
    position: {
        mainAxisAlignment: enumeration(['start', 'end', 'center', 'stretch', 'shrink']),
        crossAxisAlignment: enumeration(['start', 'end', 'center', 'stretch']),
        mainAxisSize: number({ min: 0, max: 100, step: 10, precision: 0, unit: '%' })
    },
    stroke: {
        width: number({ min: 0, max: 10, step: 0.1, precision: 1, unit: 'rem', nullable: true }),
        dashArray: number({ min: 0, max: 10, step: 0.1, precision: 1, unit: 'rem', nullable: true }),
        lineCap: enumeration([null, 'round']),
        lineJoin: enumeration([null, 'round'])
    }
}

export const StyleDefault = {
    layout: {
        direction: 'column',
        mainAxisAlignment: 'start',
        crossAxisAlignment: 'stretch',
        spacing: 1
    },
    position: {
        mainAxisAlignment: 'shrink',
        crossAxisAlignment: 'stretch'
    }
}
