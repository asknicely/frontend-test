import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import styles from "./styles/index.css";
import 'animate.css';

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { faTrashCan, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* add icons to the library */
library.add(faTrashCan);
library.add(faCheck);
library.add(faPlus);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

window.onload = function () {
  new Vue({
    styles,
    store,
    render: (h) => h(App),
  }).$mount("#vue-app");
};
