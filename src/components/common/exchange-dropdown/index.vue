<script setup lang="ts">
import UIDropdown from '@/components/ui/dropdown/index.vue'
import { exchangeList } from '@/constants/exchange'
import { computed, ref } from 'vue'
import type { Exchange } from '@/types/exchange'

const props = defineProps<{
    defaultValue?: Exchange | string
    disabledValue?: Exchange | string
    modelValue?: string
}>()

const disabledValues = computed(() =>
    props.disabledValue ? [props.disabledValue] : []
)

const getItems = (defaultValue?: Exchange | string) => {
    return exchangeList.map((exchangeItem) => {
        return {
            title: exchangeItem.toUpperCase(),
            value: exchangeItem,
            defaultSelected:
                defaultValue !== undefined
                    ? defaultValue === exchangeItem
                    : false
        }
    })
}

const items = ref(getItems(props.defaultValue))
const emit = defineEmits<{
    (e: 'update:modelValue', value: Exchange): void
}>()
</script>

<template>
    <UIDropdown
        :selected-value="props.defaultValue"
        :class="s.dropdown"
        :items="items"
        :disabled-values="disabledValues"
        @update:selected-value="emit('update:modelValue', $event as Exchange)"
    />
</template>

<style lang="scss" module="s">
.dropdown {
    min-width: 105px;
}
</style>
