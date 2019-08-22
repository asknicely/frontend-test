import Login from './pages/Login.vue'
import Todos from './pages/Todos.vue'
import HelloWorld from './pages/HelloWorld.vue'


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/', name: "index", component: Login },
    { path: '/todos', name: "todos", component: Todos },
    { path: '/hello', name: "hello", component: HelloWorld },
]

export default routes;