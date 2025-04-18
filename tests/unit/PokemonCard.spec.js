// tests/unit/PokemonCard.spec.js
import { mount } from '@vue/test-utils'

describe('PokemonCard.vue', () => {
	it('Show pokemon name', async () => {
		globalThis.usePokemonStats = () => ({
			weight:   { value: 42 },
			baseHp:   { value: 99 },
			height:   { value: 17 },
			soundUrl: '',
			image:    ''
		})

		globalThis.toRef = (obj, key) => ({ value: obj[key] })

		const PokemonCard = (await import('@/components/PokemonCard.vue')).default

		const wrapper = mount(PokemonCard, {
			props: {
				pokemon: { name: 'charmander' }
			},
			global: {
				stubs:    ['Icon'],
				directives: { capitalize: () => {} }
			}
		})

		expect(wrapper.text().toLowerCase()).toContain('charmander')

		delete globalThis.usePokemonStats
		delete globalThis.toRef
	})
})
