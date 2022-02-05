<template>
	<div id="main">
		<Header></Header>
		<main>
			<div class="container">
				<div class="row">
					<router-view></router-view>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import Header from "./Header";
export default {
	name : "App",
	components: {
		Header
	}
}
</script>

<style scoped>

</style>
