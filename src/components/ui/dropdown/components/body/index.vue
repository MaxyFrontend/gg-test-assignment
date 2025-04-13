<script setup lang="ts">
import type DropdownList from '../../types/dropdown'
const props = defineProps<{
    items: DropdownList
    selectedItemValue: string
}>()
const emit = defineEmits<{
    (e: 'item-choose', value: string): void
}>()
</script>

<template>
    <div :class="s.body">
        <ul ref="dropdownListEl" :class="s.list">
            <li
                v-for="item in props.items"
                :key="item.value"
                :class="[
                    s.listItem,
                    { [s.current]: props.selectedItemValue === item.value }
                ]"
                @click="emit('item-choose', item.value)"
            >
                <span>
                    {{ item.title }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module="s">
.body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: fit-content;
    user-select: none;
    overflow: hidden;
    transform: translateY(100%);
    z-index: 1;
    transition: height 0.25s ease;
}
.list {
    display: block;
}
.listItem {
    font-size: 16px;
    font-weight: 400;
    line-height: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    color: #363636;
    cursor: pointer;

    transition: 0.2s ease;
    white-space: nowrap;
    & > * {
        display: block;
        padding: 10px 18px;
    }
    &:first-child {
        & > * {
            padding-top: 5px;
        }
    }
    &:hover:not(.current) {
        text-decoration: underline;
    }
    &.current {
        color: rgba(54, 54, 54, 0.5);
    }
}
</style>
