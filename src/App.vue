<script setup lang="ts">
import { shallowRef } from 'vue'
import { useCycleList } from '@/composables/useCycleList'

const list = shallowRef<string[]>([
    'Dog',
    'Cat',
    'Lizard',
    'Shark',
    'Whale',
    'Dolphin',
    'Octopus',
    'Seal',
])

const { state, next, prev } = useCycleList<string>(list)
</script>

<template>
    <div class="page">
        <div>
            <h1>{{ state }}</h1>
            <div class="btn-wrapper">
                <button @click="prev">Previous</button>
                <button @click="next">Next</button>
            </div>
        </div>
    </div>
</template>
