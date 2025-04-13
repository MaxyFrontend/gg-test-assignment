<script setup lang="ts">
import getExchangeRate from '@/api/getExchangeRate'
import useExchange from '@/composables/useExchange'
import { exchangeList } from '@/constants/exchange'
import { BaseExchangeRateList } from './components/list'
import { computed, watch } from 'vue'
import Container from '@/components/core/container.vue'
import type { RateList } from './types/rate'
import { baseExchangeRateAdapter } from './helpers/baseExchangeRateAdapter'

const { exchangeRate, selectedExchange, setExchangeRate } = useExchange()

const exchangeRateListData = computed<RateList>(() => {
    return exchangeList
        .filter((item) => item !== selectedExchange.value)
        .map((exchange) => {
            return {
                referenceValue: `1 ${exchange.toUpperCase()}`,
                quotedValue: baseExchangeRateAdapter(
                    exchangeRate.value,
                    exchange,
                    selectedExchange.value
                )
            }
        })
})

const { isLoading, fetchData: fetchExchangeRate } = getExchangeRate()

watch(
    selectedExchange,
    async () => {
        const { data, error } = await fetchExchangeRate()
        if (data && !error) {
            setExchangeRate(data)
        } else {
            alert('something went wrong')
        }
    },
    {
        immediate: true
    }
)
</script>

<template>
    <section :class="s.section">
        <Container>
            <BaseExchangeRateList
                v-if="!isLoading"
                :list="exchangeRateListData"
            />
            <div v-else>Exchange Rate Loading .....</div>
        </Container>
    </section>
</template>

<style lang="scss" module="s">
.section {
    padding: 60px 0;
    flex-grow: 1;
}
</style>
