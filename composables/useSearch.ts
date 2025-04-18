import { ref } from "vue"

const searchQuery = ref('')

export const useSearch = () => {
	return searchQuery
}
