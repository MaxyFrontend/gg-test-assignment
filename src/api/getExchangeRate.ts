import useHttpClient from '@/composables/useHttpClient'
import type { ExchangeRate } from '@/types/exchange'

export default function useCurrencyApi() {
    const url = `${import.meta.env.APP_API_BASE_API}/currency`
    return useHttpClient<ExchangeRate>(url)
}
