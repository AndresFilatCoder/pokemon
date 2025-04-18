import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import PokemonCard from '@/components/PokemonCard.vue'

const mockPokemon = {
	name: 'bulbasaur',
	weight: 69,
	height: 7,
	sprites: {
		front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
	},
	stats: [
		{ base_stat: 45, stat: { name: 'hp' } }
	]
}

const router = createRouter({
	history: createWebHistory(),
	routes: [{ path: '/pokemon/:name', name: 'Pokemon', component: { template: '<div />' } }]
})

describe('PokemonCard.vue', () => {
	it('Redirects to /pokemon/:id by clicking on the pokemon card', async () => {
		globalThis.usePokemonStats = () => ({
			weight: { value: 42 },
			baseHp: { value: 99 },
			height: { value: 17 },
			soundUrl: '',
			image: ''
		})

		globalThis.toRef = (obj, key) => ({ value: obj[key] })

		await router.push('/')
		await router.isReady()

		const pushSpy = vi.fn()
		router.push = pushSpy

		const wrapper = mount(PokemonCard, {
			props: { pokemon: mockPokemon },
			global: {
				plugins: [router],
				stubs: ['Icon']
			}
		})

		await wrapper.find('.pokemon-card').trigger('click')

		expect(pushSpy).toHaveBeenCalledWith('pokemon/bulbasaur')
	})
})
