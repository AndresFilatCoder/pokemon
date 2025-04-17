import type { UseFetchOptions } from "#app"

export const useFilat = () => {
    const runtimeConfig = useRuntimeConfig()

    const getParams = <T>(options: UseFetchOptions<T> = {}) => ({
        dedupe: options.dedupe || 'cancel',
        baseURL: options.baseURL || runtimeConfig?.public?.apiBase || "",
        ...options
    })

    return {
        $get: async <T>(url: string, options: UseFetchOptions<T> = {}) => {
            options.method = "GET"
			options.immediate = false
            return await useFetch(url, getParams(options))
        },
        $post: async <T>(url: string, options: UseFetchOptions<T> = {}) => {
            options.method = "POST"
			options.immediate = false
            return await useFetch(url, getParams(options))
        },
        $patch: async <T>(url: string, options: UseFetchOptions<T> = {}) => {
            options.method = "PATCH"
			options.immediate = false
            return await useFetch(url, getParams(options))
        },
        $put: async <T>(url: string, options: UseFetchOptions<T> = {}) => {
            options.method = "PUT"
			options.immediate = false
            return await useFetch(url, getParams(options))
        },
        $delete: async <T>(url: string, options: UseFetchOptions<T> = {}) => {
            options.method = "DELETE"
			options.immediate = false
            return await useFetch(url, getParams(options))
        }
    }
}
