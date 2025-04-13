import type { ExchangeRate } from '@/types/exchange'

export const baseExchangeRateAdapter = (
    exchangeRate: ExchangeRate | null,
    referenceValue: string,
    quotedValue: string
) => {
    if (!exchangeRate) return ''
    if (!exchangeRate) {
        return ''
    }
    const exchangeKey = `${referenceValue.toLowerCase()}-${quotedValue.toLowerCase()}`
    if (exchangeKey in exchangeRate) {
        return (
            exchangeRate[
                `${referenceValue.toLowerCase()}-${quotedValue.toLowerCase()}` as keyof ExchangeRate
            ].toFixed(2) +
            ' ' +
            quotedValue.toUpperCase()
        )
    } else {
        return ''
    }
}
