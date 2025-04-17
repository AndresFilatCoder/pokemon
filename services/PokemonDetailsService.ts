export default class PokemonDetailsService {
	private pokemon

	constructor() {
		this.pokemon = ref({})
	}

	async getPokemonDetails(name: string) {
		const { data, error, execute } = await useFilat().$get(`pokemon/${name.toLowerCase()}`);
		await execute();
		console.log("dsadasdasdas")
		if (error.value) throw error.value
		this.pokemon.value = data.value || [];
		return this.pokemon.value
	}
}
