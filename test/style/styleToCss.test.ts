import { describe, expect, it } from 'vitest'
import { StyleToCSSVisitor } from '../../src/style'

describe('styleToCss', () => {
    describe('StyleToCSSVisitor selector', () => {
        it('with element ', () => {
            const visitor = new StyleToCSSVisitor()
            const css = visitor.root({
                type: 'snapshot',
                'Component-element': { padding: { top: 1 } }
            })

            expect(css).to.deep.equal({ '.sf-Component-element': { 'padding-top': '1rem' } })
        })

        it('with root element ', () => {
            const visitor = new StyleToCSSVisitor()
            const css = visitor.root({
                type: 'snapshot',
                'Component-root': { padding: { top: 1 } }
            })

            expect(css).to.deep.equal({ '.sf-Component-root': { 'padding-top': '1rem' } })
        })

        it('with element variant', () => {
            const visitor = new StyleToCSSVisitor()
            const css = visitor.root({
                type: 'snapshot',
                'Component-element:selected': { padding: { top: 1 } }
            })

            expect(css).to.deep.equal({ '.sf-Component-element.selected': { 'padding-top': '1rem' } })
        })

        it('with component variant', () => {
            const visitor = new StyleToCSSVisitor()
            const css = visitor.root({
                type: 'snapshot',
                'Component:selected-element': { padding: { top: 1 } }
            })

            expect(css).to.deep.equal({
                '.sf-Component-root.selected .sf-Component-element': { 'padding-top': '1rem' }
            })
        })

        it('with component variant and root element ', () => {
            const visitor = new StyleToCSSVisitor()
            const css = visitor.root({
                type: 'snapshot',
                'Component:selected-root': { padding: { top: 1 } }
            })

            expect(css).to.deep.equal({ '.sf-Component-root.selected': { 'padding-top': '1rem' } })
        })

        it('with both component and element variant', () => {
            const visitor = new StyleToCSSVisitor()
            const css = visitor.root({
                type: 'snapshot',
                'Component:selected-element:selected': { padding: { top: 1 } }
            })

            expect(css).to.deep.equal({
                '.sf-Component-root.selected .sf-Component-element.selected': { 'padding-top': '1rem' }
            })
        })
    })
})
