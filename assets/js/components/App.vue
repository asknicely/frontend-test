<template>
	<div id="main">
		<Header></Header>
		<main>
			<div class="container">
				<div class="row pt-3">
					<transition name="fade" mode="out-in">
						<router-view :key="$route.fullPath"></router-view>
					</transition>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Header from "./Header";
export default {
	name : "App",
	components: {
		Header
	},
	computed: {
		...mapState(['user'])
	},
	created () {
	}
}
</script>

<style lang="scss">
</style>
