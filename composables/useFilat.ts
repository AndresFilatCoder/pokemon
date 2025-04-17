import { useNuxtApp, useRuntimeConfig } from '#app'
import type { UseFetchOptions } from '#app'

export const useFilat = () => {
	const runtimeConfig = useRuntimeConfig()

	const getParams = <T>(options: UseFetchOptions<T> = {}) => ({
		dedupe: options.dedupe || 'cancel',
		baseURL: options.baseURL || runtimeConfig.public.apiBase || '',
		...options
	})

	// Detecta si estamos dentro del "setup" antes de montaje
	const isSetupContext = () => {
		try {
			const nuxtApp = useNuxtApp()
			// Hack para saber si estamos en montaje
			return !!nuxtApp._payload
		} catch {
			return false
		}
	}

	const request = async <T>(
		method: string,
		url: string,
		options: UseFetchOptions<T> = {}
	) => {
		options.method = method.toUpperCase() as any
		options.immediate = false
		const params = getParams(options)

		if (isSetupContext()) {
			// SSR/Setup phase: useFetch es válido
			return await useFetch<T>(url, params)
		} else {
			// Client-side después del montaje: usar $fetch directamente
			const data = await $fetch<T>(url, params)
			return {
				data: ref(data),
				error: ref(null),
				execute: async () => {},
			}
		}
	}

	return {
		$get: <T>(url: string, options?: UseFetchOptions<T>) =>
			request<T>('GET', url, options),
		$post: <T>(url: string, options?: UseFetchOptions<T>) =>
			request<T>('POST', url, options),
		$patch: <T>(url: string, options?: UseFetchOptions<T>) =>
			request<T>('PATCH', url, options),
		$put: <T>(url: string, options?: UseFetchOptions<T>) =>
			request<T>('PUT', url, options),
		$delete: <T>(url: string, options?: UseFetchOptions<T>) =>
			request<T>('DELETE', url, options),
	}
}
