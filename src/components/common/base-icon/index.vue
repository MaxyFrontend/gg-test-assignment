<script setup lang="ts">
import { computed } from 'vue'
import iconsMap from '@/constants/icons'

const props = defineProps<{
    icon: string
}>()
const iconComponent = computed(() => {
    for (const key in iconsMap) {
        if (key.split('/').slice(-1)[0] === props.icon + '.svg') {
            console.log(iconsMap[key])
            return iconsMap[key].default
        }
    }
    return null
})
</script>

<template>
    <span :class="s.icon" v-html="iconComponent"></span>
</template>

<style lang="scss" module="s">
.icon {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
