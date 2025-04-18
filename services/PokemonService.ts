export default class PokemonService {
	private pokemonBaseList

	constructor() {
		this.pokemonBaseList = ref([])
	}

	async getPokemonBaseList(offset: number = 0, limit: number = 20) {
		const { data, error, execute } = await useFilat().$get('pokemon', {
			query: { offset, limit }
		});
		await execute();
		if (error.value) throw error.value
		this.pokemonBaseList.value = (data.value as any)?.results ?? [];
		return this.pokemonBaseList.value;
	}
}
