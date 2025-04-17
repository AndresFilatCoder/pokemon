// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	css: ['~/assets/css/main.scss', 'bootstrap/dist/css/bootstrap.min.css'],
	runtimeConfig: {
		public: {
			apiBase: 'https://pokeapi.co/api/v2/'
		}
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/_colors.scss" as *;'
				}
			},
			preprocessorMaxWorkers: true
		},
	},
	postcss: {
		plugins: {
			autoprefixer: {},
			"postcss-custom-media": {}
		},
	},
	app: {
		head: {
			titleTemplate: '%s - PokePage',
			title: 'PokePage',
		}
	},
	modules: ['@nuxt/icon']
})
