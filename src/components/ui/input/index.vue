<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string
        placeholder?: string
        mask?: string
        name?: string
        type?: string
        invalid?: boolean
    }>(),
    {
        type: 'text',
        name: undefined,
        mask: undefined,
        placeholder: '',
        invalid: false
    }
)
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <label :class="[s.wrapper, { [s.invalid]: props.invalid }]">
        <input
            :value="props.modelValue"
            :class="s.input"
            :placeholder="props.placeholder"
            :name="props.name"
            :type="props.type"
            @input="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value
                )
            "
        />
    </label>
</template>

<style lang="scss" module="s">
.wrapper {
    display: block;
    padding: 10px 18px;
    border: 1px solid #c4c4c4;
    border-radius: 2px;
    color: #404040;
    transition:
        border,
        color,
        0.2s ease;
    &.invalid {
        border-color: rgb(191, 13, 13);
        color: rgb(191, 13, 13);
    }
}
.input {
    display: block;
    width: 100%;
    font-size: 18px;
    line-height: 1;
    color: inherit;
    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &[type='number'] {
        -moz-appearance: textfield;
    }
    @media (max-width: 1600px) {
        font-size: 16px;
    }
    @media (max-width: 550px) {
        font-size: 16px;
    }
}
</style>
