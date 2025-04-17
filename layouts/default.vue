<template>
	<div class="main-content">
		<header class="border-bottom border-ligh py-2">
			<h1 class="pokemon-font mb-0">Busca o selecciona un PoKeMoN</h1>
			<div class="d-flex justify-content-center my-2">
				<div class="d-inline-block">
					<div class="search-content d-flex bg-light">
						<input class="search-input" type="text" placeholder='Presiona "Enter" para buscar' v-model="searchText" @keyup.enter="searchPokemon()">
						<div class="search-button pe-1 d-flex align-items-center justify-content-end" @click="searchPokemon()">
							<Icon class="search-icon" name="material-symbols:search"></Icon>
							<span>Buscar</span>
						</div>
					</div>
				</div>
			</div>
		</header>

		<div class="py-5">
			<slot name="default"></slot>
		</div>

		<footer class="border-top border-ligh d-flex justify-content-center py-2">
			<div class="content d-flex align-items-center">
				<template v-for="(socialNetwork, index) in socialNetworks" :key="index">
					<a :href="socialNetwork.url" target="_blank">
						<Icon :style="{ color: socialNetwork.color }" :name="socialNetwork.icon"></Icon>
					</a>
					<span class="mx-1" v-if="index < socialNetworks.length - 1">·</span>
				</template>
			</div>
		</footer>
	</div>
</template>

<script setup>
const searchQuery = useSearch();
const socialNetworks = useSocialNewtworks();

const searchText = ref('');

const searchPokemon = () => {
	searchQuery.value = searchText.value
}
</script>

<style lang="scss" scoped>
header {
	background-color: $main;
	position: sticky;
	top: 0;
	z-index: 1;
}
footer {
	background-color: $main;
	position: fixed;
	bottom: 0;
	width: 100%;
	color: white;
	.content > a {
		display: flex;
		align-items: center;
		font-size: 1.5rem;
	}
}
.main-content {
	background: #263238;
	background: linear-gradient(0deg,rgba(38, 50, 56, 1) 0%, rgba(38, 50, 56, 1) 0%, rgba(107, 121, 128, 1) 100%) fixed no-repeat;
}
.search-icon {
	font-size: 2rem;
	color: #808080;
}
.search-content {
	border-radius: 5px;
	.search-input {
		border: none;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding: 0rem 1rem;
		&:focus {
			outline: none;
  			border: none;
		}
	}
}
.search-button {
	border-radius: 10px;
	background-color: #e6e6e6;
	cursor: pointer;
}
</style>