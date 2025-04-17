<template>
	<div class="container">
		<div class="row">
			<Loader text="Liberando pokemones..." v-if="loading"></Loader>
			<PokemonNotFound v-else-if="pokemonNotFound"></PokemonNotFound>
			<div :class="colClasses" v-else-if="searchedPokemon">
				<PokemonCard :pokemon="searchedPokemon"></PokemonCard>
			</div>
			<template v-else>
				<div :class="colClasses" v-for="(pokemon, index) in pokemonList" :key="index">
					<PokemonCard :pokemon="pokemon"></PokemonCard>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
import PokemonService from '~/services/PokemonService'
import PokemonDetailsService from '~/services/PokemonDetailsService';

const pokemonService = new PokemonService();
const pokemonDetailsService = new PokemonDetailsService();

const searchQuery = useSearch();

const colClasses = ['col-sm-12', 'col-md-6', 'col-lg-4', 'border-0', 'mb-4', 'mx-auto']
const pokemonList = ref([])
const pokemonBaseList = ref([])
const pokemonNotFound = ref(false)
const searchedPokemon = ref(null)
const loading = ref(true)

watch(searchQuery, async (newQuery) => {
	if (!newQuery) {
		searchedPokemon.value = null;
		pokemonNotFound.value = false;
		return;
	}

	try {
		loading.value = true;
		searchedPokemon.value = await pokemonDetailsService.getPokemonDetails(newQuery);
		pokemonNotFound.value = false;
	} catch (error) {
		pokemonNotFound.value = error.statusCode == 404;
	} finally {
		loading.value = false;
	}
})

const setPokemonList = async () => {
	loading.value = true;
	pokemonBaseList.value = await pokemonService.getPokemonBaseList();
	for (const pokemon of pokemonBaseList.value) {
		const pokemonDetails = await pokemonDetailsService.getPokemonDetails(pokemon.name);
		pokemonList.value.push(pokemonDetails);
	}
	loading.value = false;
}

onBeforeMount(async () => {
	setPokemonList();
})
</script>

<style lang="scss" scoped>
</style>
