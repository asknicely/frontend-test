import HomeComponent from './components/home.vue';
import LoginComponent from './components/login.vue';
import TodoComponent from './components/todo.vue';

export default [
    {path: '/', component: HomeComponent},
    {path: '/login', component: LoginComponent},
    {path: '/todo', component: TodoComponent},
];