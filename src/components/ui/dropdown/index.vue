<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { DropdownHeader } from './components/header'
import { DropdownBody } from './components/body'
import type DropdownList from './types/dropdown'

const props = withDefaults(
    defineProps<{
        title?: string
        items: DropdownList
        disabledValues: string[]
        selectedValue?: string
    }>(),
    {
        title: '',
        selectedValue: ''
    }
)

const emit = defineEmits<{
    (e: 'update:selectedValue', value: string): void
}>()

const itemsList = computed<DropdownList>(() =>
    props.items.filter((item) => !props.disabledValues.includes(item.value))
)
const dropdownRef = ref<HTMLElement>()
const dropdownHeaderRef = ref<InstanceType<typeof DropdownHeader> | undefined>()
const dropdownWrapperRef = ref<HTMLElement>()
const dropdownBodyRef = ref<InstanceType<typeof DropdownBody> | undefined>()
const isOpened = ref(false)
const localSelectedValue = ref(props.selectedValue)

const selectedItem = computed(() => {
    return (
        props.items.find((item) => item.value === localSelectedValue.value) ||
        null
    )
})

const dropdownHeaderHeight = computed(() => {
    if (!dropdownHeaderRef?.value?.$el) return undefined
    return (
        (dropdownHeaderRef.value.$el as HTMLElement).offsetHeight + 'px' ||
        undefined
    )
})

const dropdownHeight = computed(() => {
    if (!dropdownWrapperRef.value || !isOpened.value) {
        return dropdownHeaderHeight.value || undefined
    }
    return dropdownWrapperRef.value.scrollHeight + 'px'
})

const chooseItemHandler = (selectedItemValue: string) => {
    if (selectedItemValue) {
        isOpened.value = false
        localSelectedValue.value = selectedItemValue
    }
}

const clickOutHandler = () => {
    console.log('fsdfs')
    isOpened.value = false
}

const setDefaultItem = () => {
    const hasDefaultSelectedItem = () => {
        return props.items.some((item) => item.defaultSelected)
    }
    if (!hasDefaultSelectedItem()) {
        localSelectedValue.value = props.items[0].value
    }
}

setDefaultItem()

emit('update:selectedValue', localSelectedValue.value)

watch(localSelectedValue, (selectedValue: string) => {
    emit('update:selectedValue', selectedValue)
})
</script>

<template>
    <div
        ref="dropdownRef"
        v-click-outside="clickOutHandler"
        :class="[s.dropdown, { [s.opened]: isOpened }]"
    >
        <DropdownHeader
            ref="dropdownHeaderRef"
            :title="selectedItem?.title || props.title"
            :is-opened="isOpened"
            @click="isOpened = !isOpened"
        />
        <div
            ref="dropdownWrapperRef"
            :class="s.dropdownWrapper"
            :style="{
                height: dropdownHeight || '100%'
            }"
        >
            <DropdownBody
                ref="dropdownBodyRef"
                :items="itemsList"
                :selected-item-value="localSelectedValue"
                :style="{
                    transform: `translateY(${dropdownHeaderHeight})`
                }"
                @item-choose="chooseItemHandler"
            />
        </div>
    </div>
</template>

<style lang="scss" module="s">
.dropdown {
    position: relative;
    width: fit-content;
    min-width: 0;
    z-index: 100;
    &.opened {
        z-index: 1000;
    }
}
.dropdownWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: fit-content;
    background-color: #fafafa;
    border: 1px solid #c4c4c4;
    border-radius: 2px;
    overflow: hidden;
    z-index: 10;
    transition: height 0.3s ease;
}
</style>
