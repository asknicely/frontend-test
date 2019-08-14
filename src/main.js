import Vue from 'vue';
import ToDosComponent from './components/ToDosComponent.vue';
import ToDoComponent from './components/ToDoComponent.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(ToDosComponent),
}).$mount('#todos');

new Vue({
  store,
  render: h => h(ToDoComponent),
}).$mount('#todo');
