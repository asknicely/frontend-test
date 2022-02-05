import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import Todo from "../components/TodoList";

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path : '',
			name : 'Home',
			component : Home
		},
		{
			path: '/todo',
			name: 'Todo',
			component: Todo
		}
	]
})
