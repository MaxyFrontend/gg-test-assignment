import { ref, readonly } from 'vue'

type Result<T> = {
    data: T | null
    error: unknown | null
    status: number | null
}

export default function useHttpClient<T>(
    baseUrl: string,
    baseOptions?: RequestInit
) {
    const isLoading = ref(false)
    const error = ref<unknown>(null)
    const data = ref<T | null>(null)
    const status = ref<number | null>(null)

    async function fetchData(
        url: string = baseUrl,
        options?: RequestInit
    ): Promise<Result<T>> {
        isLoading.value = true
        error.value = null

        try {
            const response = await fetch(url, options || baseOptions)
            status.value = response.status

            if (response.ok) {
                data.value = await response.json()
                return {
                    data: data.value,
                    error: null,
                    status: status.value
                }
            }

            return {
                data: null,
                error: null,
                status: status.value
            }
        } catch (err) {
            console.error(err)
            error.value = err
            return {
                data: null,
                error: err,
                status: null
            }
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading: readonly(isLoading),
        error: readonly(error),
        data: readonly(data),
        status: readonly(status),
        fetchData
    }
}
