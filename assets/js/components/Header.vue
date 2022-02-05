<template>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand" @click="$route.push('/')"><span class="glyphicon glyphicon-home glyphicon-white"></span></a>
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li><a href="/todo">Todo list</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					{% if user %}
					<li><a href="/logout"><span class="glyphicon glyphicon-user"></span> {{ user.username }} Logout</a></li>
					{% else %}
					<li><a href="/login">Login</a></li>
					{% endif %}
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name : "Header"
}
</script>

<style scoped>

</style>
