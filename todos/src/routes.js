import Login from './components/Login.vue'
import Todos from './components/Todos.vue'
import HelloWorld from './components/HelloWorld.vue'


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Login },
    { path: '/todos', component: Todos },
    { path: '/hello', component: HelloWorld },
]

export default routes;