<script setup lang="ts">
import type { RateList } from '../../types/rate'

const props = defineProps<{
    list: RateList
}>()
</script>

<template>
    <ul :class="s.list">
        <li
            v-for="rateItem in props.list"
            :key="rateItem.referenceValue"
            :class="s.listItem"
        >
            {{ rateItem.referenceValue }} = {{ rateItem.quotedValue }}
        </li>
    </ul>
</template>

<style lang="scss" module="s">
.list {
    display: flex;
    align-items: center;
}
.listItem {
    &:nth-child(n + 2) {
        margin-left: 70px;
    }
}
</style>
