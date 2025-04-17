<template>
	<div class="button p-2" :style="{ backgroundColor: bgColor, color: textColor, width: width }">
		<slot></slot>
	</div>
</template>

<script setup>
defineProps({
	bgColor: {
		type: String,
		default: '#6bacb7'
	},
	textColor: {
		type: String,
		default: '#ffffff'
	},
	width: {
		type: String,
		default: '10rem'
	}
})
</script>

<style lang="scss" scoped>
.button {
	font-weight: bold;
	border: 1px solid white;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;
	&:hover {
		transition: 0.1s;
		transform: scale(1.1, 1.1);
	}
}
</style>