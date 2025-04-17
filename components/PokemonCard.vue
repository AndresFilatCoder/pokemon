<template>
	<div class="pokemon-card position-relative" @click="$router.push(`pokemon/${pokemon.name}`)">
		<div class="card-header">
			<div class="pokemon-sound-button" v-if="soundUrl">
				<Icon name="lets-icons:sound-max-fill" @click.stop="playAudio(soundUrl)"></Icon>
			</div>
			<img :src="image" :alt="pokemon.name" class="img-fluid" v-if="image">
			<img src="/public/img/pikachu-silhouette.png" alt="Pikachu silhouette" class="img-fluid" v-else>
			<div class="pokemon-name p-2">
				<h5 class="mb-0" v-capitalize>{{ pokemon.name }}</h5>
			</div>
		</div>
		<div class="card-content p-2">
			<template v-for="(stat, index) in stats" :key="index">
				<div class="d-flex align-items-center justify-content-center">
					<Icon :name="stat.icon" :class="stat.bgColor"></Icon>
					&nbsp;<b>{{ stat.name }}:</b>&nbsp;
					<span>{{ stat.value }}</span>
				</div>
				<hr class="w-50 mx-auto mt-0 mb-0" v-if="index < stats.length - 1">
			</template>
		</div>
	</div>
</template>

<script setup>
import { playAudio } from '~/utils/playAudio.ts'

const props = defineProps({
	pokemon: {
		type: Object,
		required: true
	}
})

const { weight, baseHp, height, soundUrl, image } = usePokemonStats(toRef(props, 'pokemon'));

const stats = [
	{
		icon: 'material-symbols:height-rounded',
		bgColor: "bg-danger",
		name: 'Altura',
		value: `${height.value} cm`
	},
	{
		icon: 'material-symbols:weight-sharp',
		name: 'Peso',
		bgColor: "bg-dark",
		value: `${weight.value} kg`
	},
	{
		icon: 'material-symbols:cardio-load',
		name: 'Salud Base',
		bgColor: "bg-danger",
		value: `${baseHp.value} pts`
	}
]
</script>

<style lang="scss" scoped>
$radius: 10px;

.pokemon-card {
	background-color: white;
	border-radius: $radius;
	border: 1px solid white;
	cursor: pointer;
	transform: scale(1);
	transition: transform 0.3s ease, z-index 0.3s ease;

	&:hover {
		box-shadow: 0 20px 80px rgba(0,0,0,0.1);
		transform: scale(1.02);
	}
}
.card-header {
	position: relative;
	display: flex;
	justify-content: center;
	background-color: $main;
	border-radius: $radius;
	height: 20vh;
	img {
		width: 100%;
  		height: auto;
  		object-fit: contain;
	}
}
.pokemon-name {
	position: absolute;
	bottom: 0;
	background-color: #eceff1ed;
	width: 100%;
	text-align: center;
	border-top-left-radius: 5px;
  	border-top-right-radius: 5px;
}
.pokemon-sound-button {
	background-color: rgba(100, 100, 100, 0.31);
	border-radius: 50%;
	display: flex;
	align-items: center;
	position: absolute;
	font-size: 2rem;
	top: 0.5rem;
	right: 0.5rem;
	color: white;
	cursor: pointer;

	&:hover {
		background-color: #6464648a;
	}
}
</style>
