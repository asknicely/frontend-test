import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [],
  },
  mutations: {
    getTodos(state) {
      axios
        .get("/todo", {
          data: null,
          headers: { "content-type": "application/json" },
        })
        .then(function (response) {
          state.todoList = response.data;
        });
    },
    markComplete(state, id) {
      axios
        .put("/todo/complete/" + id, {
          data: null,
          headers: { "content-type": "application/json" },
        })
        .then((response) => {
          if (response.status === 200) {
            var index = state.todoList.findIndex((obj) => obj.id === id);
            state.todoList[index].completed = "1";
          }
        });
    },
    deleteTodo(state, id) {
      axios
        .delete("/todo/delete/" + id, {
          data: null,
          headers: { "content-type": "application/json" },
        })
        .then((response) => {
          if (response.status === 200) {
            var index = state.todoList.findIndex((obj) => obj.id === id);
            state.todoList.splice(index, 1);
          }
        });
    },
  },
  actions: {},
  modules: {},
});
