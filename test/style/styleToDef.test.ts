import { describe, expect, it } from 'vitest'
import { defToStyle, styleToDef } from '../../src/style/styleToDef'
import { StyleNode, SplitflowStyleDef } from '../../src/style/style'

const styleDef: SplitflowStyleDef = {
    root: {
        padding: { top: 1 },
        ':selected': {
            padding: { top: 2 }
        },
        '@:hover': {
            padding: { top: 3 }
        },
        '@:hover:selected': {
            padding: { top: 4 }
        }
    }
}

const style: StyleNode = {
    type: 'fragment',
    'Component-root': {
        padding: { top: 1 }
    },
    'Component-root:selected': {
        padding: { top: 2 }
    },
    'Component:hover-root': {
        padding: { top: 3 }
    },
    'Component:hover-root:selected': {
        padding: { top: 4 }
    }
}

describe('styledef', () => {
    describe('defToStyle', () => {
        it('with variants', () => {
            expect(defToStyle('Component', styleDef)).to.deep.equal(style)
        })
    })
    describe('styleToDef', () => {
        it('with variants', () => {
            const result = [...styleToDef(style)]
console.log(JSON.stringify(result))
            expect(result).to.have.length(1)
            expect(result[0][0]).to.equal('Component')
            expect(result[0][1]).to.deep.equal(styleDef)
        })
    })
})
