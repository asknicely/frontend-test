import Vue from 'vue'
import Router from 'vue-router'
import Home from "../pages/Home";
import Todo from "../pages/TodoList";
import Login from "../pages/Login";
import store from "../vuex/store";

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path : '',
			name : 'Home',
			component : Home
		},
		{
			path : '/login',
			name : 'Login',
			component : Login,
		},
		{
			path: '/todo',
			name: 'Todo',
			component: Todo,
			meta: {
				requireAuth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	const user = store.state.user;

	if (user && to.name === 'Login') {
		next('/')
	}
	if (to.matched.some(page => page.meta.requireAuth)) {
		if (!user) {
			next({ name: 'Login' })
		} else {
			next()
		}
	} else {
		next()
	}
});

export default router;
