<script setup lang="ts">
import { BaseIcon } from '@/components/common/base-icon'
const props = defineProps<{
    title: string
    hidden?: boolean
    isOpened: boolean
}>()
</script>

<template>
    <div
        ref="dropdownHeaderEl"
        :class="[
            s.header,
            {
                [s.opened]: props.isOpened,
                [s.hidden]: props.hidden
            }
        ]"
    >
        <p :class="s.title">
            {{ props.title }}
        </p>
        <BaseIcon :class="s.icon" icon="arrow-bottom" />
    </div>
</template>

<style lang="scss" module="s">
.header {
    &.hidden {
        opacity: 0;
        visibility: hidden;
    }
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    z-index: 25;
    user-select: none;
    background-color: transparent;
    padding: 12px 18px;
}
.title {
    font-size: 16px;
    font-weight: 400;
    line-height: auto;
    color: #404040;
    letter-spacing: 6%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
}
.icon {
    margin-left: 20px;
    transition: transform 0.2s ease;
    .opened & {
        transform: rotate(180deg);
    }
}
</style>
