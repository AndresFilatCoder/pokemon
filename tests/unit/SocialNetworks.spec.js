// tests/unit/Layout.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '@/layouts/default.vue'

vi.mock('@/composables/useSocialNewtworks', () => ({
	useSocialNewtworks: () => [
		{
			name: 'GitHub',
			icon: 'mdi:github',
			url: 'https://github.com/AndresFilatCoder',
			color: '#ffffff'
		},
		{
			name: 'LinkedIn',
			icon: 'mdi:linkedin',
			url: 'https://www.linkedin.com/in/andres-david-pena/',
			color: '#0077B5'
		}
	]
}))

describe('DefaultLayout.vue', () => {
	it('Renders social network links with correct hrefs', () => {
		const wrapper = mount(DefaultLayout, {
			slots: {
				default: '<div />'
			},
			global: {
				stubs: ['Icon']
			}
		})

		const links = wrapper.findAll('footer a')
		expect(links).toHaveLength(2)

		expect(links[0].attributes('href')).toBe('https://github.com/AndresFilatCoder')
		expect(links[1].attributes('href')).toBe('https://www.linkedin.com/in/andres-david-pena/')
	})
})
