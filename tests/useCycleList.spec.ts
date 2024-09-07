import { describe, it, expect } from 'vitest'
import { toValue, shallowRef } from 'vue'

import { useCycleList } from '../src/composables/useCycleList'

describe('useCycleList', () => {
    const arr = [1, 2, 3]

    it('returns the first item in the array as the state before prev or next', () => {
        const { state } = useCycleList(arr)

        expect(toValue(state)).toBe(1)
    })
    it('sets state to the next item in the array on next()', () => {
        const { state, next } = useCycleList(arr)

        next() // 2
        expect(toValue(state)).toBe(2)
    })

    it('sets state to the previous item in the array on prev()', () => {
        const { state, next, prev } = useCycleList(arr)

        next() // 2
        prev() // 1
        expect(toValue(state)).toBe(1)
    })

    it('cycles to the end on prev if at beginning', () => {
        const { state, prev } = useCycleList(arr)

        prev() // 3 (return to the end)
        expect(toValue(state)).toBe(3)
    })

    it('cycles to the beginning on next if at the end', () => {
        const { state, next } = useCycleList(arr)

        next() // 2
        next() // 3
        next() // 1 (return to the beginning)
        expect(toValue(state)).toBe(1)
    })

    it('Bonus: works with refs', () => {
        const refArr = shallowRef<number[]>(arr)
        const { state, next, prev } = useCycleList(refArr)

        next() // 2
        prev() // 1
        expect(toValue(state)).toBe(1)
    })

    it('Bonus: works when the provided ref changes value', () => {
        const refArr = shallowRef<number[]>(arr)
        const { state, next } = useCycleList(refArr)

        next() // 2
        next() // 3
        refArr.value.push(4) // [1, 2, 3, 4]
        next() // 4
        expect(toValue(state)).toBe(4)
    })

    it("Bonus: resets index to 0 if updated ref doesn't include the activeIndex", () => {
        const refArr = shallowRef<number[]>(arr)
        const { state, next } = useCycleList(refArr)

        next() // 2
        next() // 3

        refArr.value = [1, 2] // 3 is undefined in the new array

        expect(toValue(state)).toBe(1)
    })

    it('Bonus: support the taking in an array, a reactive array (defined with ref), a getter function that returns an array.', () => {
        const refArr = shallowRef<number[]>(arr)
        const { getPlain } = useCycleList(refArr)

        expect(getPlain()).toEqual(refArr.value)
    })
})
