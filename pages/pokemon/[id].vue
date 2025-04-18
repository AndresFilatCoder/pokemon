<template>
	<div class="d-flex justify-content-center" v-if="loading">
		<Loader text="Liberando Pokemon..."></Loader>
	</div>
	<PokemonNotFound v-else-if="pokemonNotFound"></PokemonNotFound>
	<template v-else>
		<div class="d-flex align-items-center justify-content-center">
			<h2 class="pokemon-font mt-3 me-2" v-capitalize>{{ pokemon.name }}</h2>
			<Icon class="pokemon-sound-icon" name="lets-icons:sound-max-fill" @click="playAudio(soundUrl)"></Icon>
		</div>
		<div class="d-flex justify-content-center">
			<img :src="image" :alt="pokemon.name" class="img-fluid" width="250" v-if="image">
		</div>
		<div class="container-md table-container">
			<div class="row text-center py-2 border-bottom border-secondary table-header">
				<h2 class="mb-0">Estadísticas</h2>
			</div>
			<div class="row" v-for="(stat, index) in stats" :key="index">
				<div class="stat-name col-sm-12 col-md-6 d-flex justify-content-center align-items-center py-1 border-bottom border-secondary">
					<Icon :name="stat.icon" class="me-1" :class="stat.bgColor"></Icon>
					<b>{{ stat.name }}</b>
				</div>
				<div class="col-sm-12 col-md-6 d-flex justify-content-center py-1 border-bottom border-secondary">
					<template v-if="stat.badges">
						<span class="d-flex align-items-center badge text-bg-success" :class="{'me-2': index < stat.badges.length - 1}" v-for="(badge, index) in stat.badges" :key="index">
							{{ badge }}
						</span>
					</template>
					<span v-else>{{ stat.value }}</span>
				</div>
			</div>
		</div>
		<div class="d-flex justify-content-center mt-4">
			<NuxtLink to="/" class="text-reset text-decoration-none">
				<Button>Volver</Button>
			</NuxtLink>
		</div>
	</template>
</template>

<script setup>
import PokemonDetailsService from '~/services/PokemonDetailsService';

const route = useRoute()
const router = useRouter()
const searchQuery = useSearch()

useSeoMeta({
	title: `Detalles de ${route.params.id}`,
	ogTitle: `Obten informacion detallada de ${route.params.id}`,
})

const pokemonDetailsService = new PokemonDetailsService();

const pokemon = ref(null)
const loading = ref(true)
const pokemonNotFound = ref(false)
const stats = ref([])

const { weight, baseHp, height, soundUrl, image, abilities, forms } = usePokemonStats(pokemon);

watch(loading, (newValue) => {
	if (!newValue) {
		stats.value = [
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
			},
			{
				icon: 'material-symbols:star-rounded',
				name: 'Habilidades',
				bgColor: "bg-success",
				badges: abilities,
			},
			{
				icon: 'file-icons:3d-model',
				name: 'Formas',
				bgColor: "bg-primary",
				badges: forms,
			}
		]
	}
})

watch(searchQuery, (newValue) => {
	if (newValue) router.push(newValue.toLowerCase())
})

onBeforeMount(async () => {
	try {
		loading.value = true
		pokemon.value = await pokemonDetailsService.getPokemonDetails(route.params.id)
		pokemonNotFound.value = false;
	} catch (error) {
		pokemonNotFound.value = error.statusCode == 404;
	} finally {
		loading.value = false;
	}
})
</script>

<style lang="scss" scoped>
.pokemon-sound-icon {
	color: white;
	font-size: 2rem;
	cursor: pointer;
}

.table-container {
	background-color: #ffffffde;
	border: 1px solid black;
	border-radius: 10px;
}
.stat-name {
	border-right: 1px solid black;
}
@media (min-width: 768px) {
	.table-container {
		width: 50vw;
  	}
}
@media (min-width: 992px) {
	.table-container {
		width: 40vw;
	}
}
@media (min-width: 1200px) {
	.table-container {
		width: 30vw;
	}
}
@media (max-width: 576px) {
	.table-container {
		width: 90vw;
	}
	.stat-name {
		border: none;
	}
}
.table-header {
	background-color: aliceblue;
	border-radius: 10px;
}
</style>