export default defineNuxtPlugin(() => {
	useSeoMeta({
		description: 'Descubre información detallada sobre todos los Pokémon',
		ogDescription: 'Una Pokédex completa con todos los Pokémon.',
		ogImage: '/img/pikachu-silhouette.png',
		twitterCard: 'summary_large_image',
	})
})
