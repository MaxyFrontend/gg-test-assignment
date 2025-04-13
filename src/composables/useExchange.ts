import { ref } from 'vue'
import type { Exchange, ExchangeRate } from '@/types/exchange'

import exchangeList from '@/constants/exchange'

const selectedExchange = ref<Exchange>(exchangeList[0])
const exchangeRate = ref<ExchangeRate | null>(null)

export default function useExchange() {
    const setExchange = (newExchange: Exchange): void => {
        selectedExchange.value = newExchange
    }
    const setExchangeRate = (newExchangeRate: ExchangeRate): void => {
        exchangeRate.value = newExchangeRate
    }
    return {
        selectedExchange,
        exchangeRate,
        setExchange,
        setExchangeRate
    }
}
