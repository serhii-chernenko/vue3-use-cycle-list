import type { MaybeRefOrGetter } from 'vue'
import { shallowRef, ref, computed, toValue } from 'vue'

interface CycleList<T> {
    prev: () => void
    next: () => void
    state: MaybeRefOrGetter<T>
}

export const useCycleList = <T>(
    arr: T[] | MaybeRefOrGetter<T[]>,
): CycleList<T> => {
    const index = shallowRef<number>(0)
    const resultArr: MaybeRefOrGetter<T[]> = Array.isArray(arr)
        ? (ref<T[]>(arr) as MaybeRefOrGetter<T[]>)
        : (arr as MaybeRefOrGetter<T[]>)

    return {
        prev: () => {
            index.value =
                index.value === 0
                    ? toValue(resultArr).length - 1
                    : index.value - 1
        },
        next: () => {
            index.value =
                index.value === toValue(resultArr).length - 1
                    ? 0
                    : index.value + 1
        },
        state: computed<T>(() => {
            const result = toValue(resultArr)
            const item = result[toValue(index)]

            if (item) {
                return item
            }

            const firstIndex = 0

            index.value = firstIndex

            return result[firstIndex]
        }),
    }
}
