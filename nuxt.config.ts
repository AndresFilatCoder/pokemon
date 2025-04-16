// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	runtimeConfig: {
		public: {
			apiBase: 'https://pokeapi.co/api/v2/'
		}
	},
	app: {
		head: {
			titleTemplate: '%s - PokePage',
			title: 'PokePage',
		}
	},
})
