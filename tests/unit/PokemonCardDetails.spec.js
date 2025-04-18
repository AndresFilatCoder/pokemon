import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('PokemonCard.vue', () => {
	it('Should display Height, Weight, and Base Health in the card content', async () => {
		globalThis.usePokemonStats = () => ({
			weight: { value: 42 },
			baseHp: { value: 99 },
			height: { value: 17 },
			soundUrl: '',
			image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
		})

		globalThis.toRef = (obj, key) => ({ value: obj[key] })

		const PokemonCard = (await import('@/components/PokemonCard.vue')).default

		const wrapper = mount(PokemonCard, {
			props: {
				pokemon: { 
					name: 'charmander' 
				}
			},
			global: {
				stubs: ['Icon'],
				directives: { capitalize: () => {} }
			}
		})

		const textContent = wrapper.find('.pokemon-card .card-content').text().replace(/\s+/g, ' ').trim()

		expect(textContent).toContain('Altura: 17 cm')
		expect(textContent).toContain('Peso: 42 kg')
		expect(textContent).toContain('Salud Base: 99 pts')

		delete globalThis.usePokemonStats
		delete globalThis.toRef
	})
})
