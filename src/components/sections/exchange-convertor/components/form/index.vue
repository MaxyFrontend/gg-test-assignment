<script setup lang="ts">
import ExchangeDropdown from '@/components/common/exchange-dropdown/index.vue'
import { UIinput } from '@/components/ui/input'
import { ref, reactive, computed, watch } from 'vue'
import { required, numeric } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import getExchangeRate from '@/api/getExchangeRate'
import useExchange from '@/composables/useExchange'
import { exchangeRateAdapter } from '../../helpers/exchangeRateAdapter'
import { exchangeList } from '@/constants/exchange'
import type { Exchange } from '@/types/exchange'

const state = reactive({
    referenceExchangeValue: '1',
    quoteExchangeValue: '1'
})
const rules = computed(() => {
    return {
        referenceExchangeValue: { required, numeric },
        quoteExchangeValue: { required, numeric }
    }
})

const referenceExchangeType = ref<Exchange | string>('')
const quoteExchangeType = ref<Exchange | string>('')

const quoteExchangeDropdownDefaultValue = computed(() => {
    return exchangeList.find(
        (exchangeType) => exchangeType !== selectedExchange.value
    )
})

const v$ = useVuelidate(rules, state)
v$.value.$validate()

const { selectedExchange, exchangeRate, setExchangeRate } = useExchange()
const { isLoading, fetchData: fetchExchangeRate } = getExchangeRate()

const referenceExchangeUpdate = () => {
    if (v$.value.$errors.length === 0 && exchangeRate.value) {
        state.quoteExchangeValue = exchangeRateAdapter(
            exchangeRate.value,
            referenceExchangeType.value,
            quoteExchangeType.value,
            Number(state.referenceExchangeValue)
        ).toString()
    }
}
const quoteExchangeUpdate = () => {
    if (v$.value.$errors.length === 0) {
        state.referenceExchangeValue = exchangeRateAdapter(
            exchangeRate.value,
            quoteExchangeType.value,
            referenceExchangeType.value,
            Number(state.quoteExchangeValue)
        ).toString()
    }
}

watch([referenceExchangeType, quoteExchangeType], async () => {
    if (v$.value.$errors.length === 0) {
        const { data, error } = await fetchExchangeRate()
        if (data && !error) {
            setExchangeRate(data)
            referenceExchangeUpdate()
            quoteExchangeUpdate()
        }
    }
})
</script>

<template>
    <form :class="s.form">
        <div :class="s.formContent">
            <div :class="s.row">
                <ExchangeDropdown
                    v-model="referenceExchangeType"
                    :default-value="selectedExchange"
                    :disabled-value="quoteExchangeType"
                    :class="s.dropdown"
                />
                <div :class="s.inner">
                    <UIinput
                        v-model="state.referenceExchangeValue"
                        type="text"
                        :class="s.input"
                        :invalid="v$.referenceExchangeValue.$error"
                        @input="referenceExchangeUpdate"
                    />
                    <p
                        v-if="v$.referenceExchangeValue.$error"
                        :class="s.errorMessage"
                    >
                        Некорректный формат
                    </p>
                </div>
            </div>
            <div :class="s.row">
                <ExchangeDropdown
                    v-model="quoteExchangeType"
                    :default-value="quoteExchangeDropdownDefaultValue"
                    :disabled-value="referenceExchangeType"
                    :class="s.dropdown"
                />
                <div :class="s.inner">
                    <UIinput
                        v-model="state.quoteExchangeValue"
                        type="text"
                        :class="s.input"
                        :invalid="v$.quoteExchangeValue.$error"
                        @input="quoteExchangeUpdate"
                    />
                    <p
                        v-if="v$.quoteExchangeValue.$error"
                        :class="s.errorMessage"
                    >
                        Некорректный формат
                    </p>
                </div>
            </div>
        </div>
        <p v-if="isLoading" :class="s.loader">Exchange Rate Loading...</p>
    </form>
</template>

<style lang="scss" module="s">
.form {
    padding: 70px;
}
.formContent {
    display: flex;
    justify-content: center;
}
.row {
    display: flex;
    align-items: flex-start;
    &:nth-child(n + 2) {
        margin-left: 50px;
    }
}
.inner {
    margin-left: 20px;
}
.loader {
    width: fit-content;
    margin: 40px auto 0;
}
.errorMessage {
    color: rgb(191, 13, 13);
    margin-top: 5px;
}
</style>
