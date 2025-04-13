import type { ExchangeRate } from '@/types/exchange'

export const exchangeRateAdapter = (
    exchangeRate: ExchangeRate | null,
    referenceValue: string,
    quotedValue: string,
    referenceAmount: number
) => {
    if (!exchangeRate) {
        return ''
    }
    console.log(
        Number(
            exchangeRate[
                `${referenceValue.toLowerCase()}-${quotedValue.toLowerCase()}` as keyof ExchangeRate
            ]
        )
    )
    return (
        Number(
            exchangeRate[
                `${referenceValue.toLowerCase()}-${quotedValue.toLowerCase()}` as keyof ExchangeRate
            ]
        ) * referenceAmount
    ).toFixed(2)
}
