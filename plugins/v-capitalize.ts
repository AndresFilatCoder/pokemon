export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('capitalize', {
		mounted(el: HTMLElement) {
			const text = el.textContent || ''
			el.textContent = text.charAt(0).toUpperCase() + text.slice(1)
		},
	})
})