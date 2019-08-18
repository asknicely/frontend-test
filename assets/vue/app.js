/*/////  Light Vue Todos for Symfony2.0 /////
///////  Author: Kinson Lau ///////////////////////// */
import Vue from "vue";
import Todos from "./views/Todos";
import Todo from "./views/Todo";

/*
  VUE CONFIG
*/
Vue.config.devtools = true; // Remove for production
Vue.config.productionTip = false; // Update for production

/*
  ROOT COMPONENT
  METHODS
  - addToCart: Adds product via the product page and product tiles
  - updateQuantity: Updates an item in the cart
  - setFocus: Displays / hides the mobile search form and focuses
*/

new Vue({
  delimiters: ["${", "}"],
  el: "#app",
  components: {
    Todos: Todos,
    Todo: Todo
  }
});
