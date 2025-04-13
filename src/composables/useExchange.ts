import { ref } from 'vue'
import type { Exchange } from '@/types/exchange'

import exchangeList from '@/constants/exchange'

const exchange = ref<Exchange>(exchangeList[0])

export default function useExchange() {
    const setExchange = (newExchange: Exchange): void => {
        exchange.value = newExchange
    }
    return {
        exchange,
        setExchange
    }
}
