// ✅ Mover el mock ARRIBA antes de importar el layout
import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'

const searchQuery = ref('')

vi.mock('@/composables/useSearch', () => ({
	useSearch: () => searchQuery
}))

vi.mock('@/composables/useSocialNewtworks', () => ({
	useSocialNewtworks: () => []
}))

import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

describe('DefaultLayout.vue', () => {
	it('Updates searchQuery when clicking search button', async () => {
		const wrapper = mount(DefaultLayout, {
			slots: { default: '<div />' },
				global: {
				stubs: ['Icon']
			}
		})

		const input = wrapper.find('.search-input')
		await input.setValue('pikachu')

		const button = wrapper.find('.search-button')
		await button.trigger('click')

		expect(searchQuery.value).toBe('pikachu')
	})
})
