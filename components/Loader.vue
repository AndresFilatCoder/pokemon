<template>
	<div class="d-inline-block text-center">
		<img class="d-block mx-auto" src="/public/gifs/pokeball.gif" alt="Pokeball Rotating" :width="width">
		<b class="text-white">{{ text || 'Cargando...' }}</b>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	width: {
		type: Number,
		default: 120
	},
	text: {
		type: String,
		required: false
	}
})
</script>

<style lang="scss" scoped>
</style>