export function usePokemonStats(pokemon: Ref<any>) {
	const weight = computed(() => {
		return pokemon.value.weight / 10
	})

	const baseHp = computed(() => {
		return pokemon.value.stats?.find(stat => stat.stat.name === "hp")?.base_stat
	})

	const height = computed(() => {
		return pokemon.value.height ? pokemon.value.height * 10 : '?'
	})

	const soundUrl = computed(() => {
		return pokemon.value.cries?.latest
	})

	const image = computed(() => {
		return pokemon.value?.sprites?.other?.['official-artwork']?.front_default
	})

	const abilities = computed(() => {
		return pokemon.value?.abilities.map(ability => ability.ability.name)
	})

	const forms = computed(() => {
		return pokemon.value?.forms.map(form => form.name)
	})

	return { weight, baseHp, height, soundUrl, image, abilities, forms }
}
