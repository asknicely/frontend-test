import { createApp } from "vue";
import Todos from "./todos.vue";

const app = createApp(Todos, {
  BASE_URL: BASE_URL,
  OPEN_TODO_ID: OPEN_TODO_ID,
});
app.mount("#todos");
