import { mount } from '@vue/test-utils'
import PokemonCard from '@/components/PokemonCard.vue'

describe('PokemonCard.vue', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('Should render the sound button', async () => {
		vi.stubGlobal('usePokemonStats', () => ({
			weight: { value: 69 },
			baseHp: { value: 45 },
			height: { value: 7 },
			soundUrl: 'https://example.com/cries/bulbasaur.mp3',
			image: 'https://example.com/bulbasaur.png'
		}))

		globalThis.toRef = (obj, key) => ({ value: obj[key] })

		const wrapper = mount(PokemonCard, {
			props: {
				pokemon: { name: 'bulbasaur' }
			},
				global: {
				stubs: ['Icon']
			}
		})

		await wrapper.vm.$nextTick()

		const soundButton = wrapper.find('.pokemon-sound-button')
		expect(soundButton.exists()).toBe(true)
	})
})
