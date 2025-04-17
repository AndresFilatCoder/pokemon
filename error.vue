<template>
	<div class="main-content">
		<div>
			<img src="/public/gifs/giphy.gif" alt="Pokemon confused">
		</div>
		<div>
			<h1 class="pokemon-font status-code">{{ error.statusCode }}</h1>
			<h2 class="pokemon-font">{{ error.statusMessage }}</h2>
			<NuxtLink to="/" class="text-reset text-decoration-none">
				<Button class="mt-4">Volver</Button>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
defineProps({
	error: {
		type: Object,
		default: {},
	}
})
</script>

<style lang="scss" scoped>
.status-code {
	font-size: 6rem;
}
.main-content {
	display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
}
</style>