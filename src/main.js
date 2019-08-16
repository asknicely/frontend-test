import Vue from 'vue';
import ToDoListComponent from './components/ToDoListComponent.vue';
import ToDoComponent from './components/ToDoComponent.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(ToDoListComponent),
}).$mount('#todolist-component');

new Vue({
  store,
  render: h => h(ToDoComponent),
}).$mount('#todo-component');
