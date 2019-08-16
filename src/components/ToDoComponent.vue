<template>
  <tr v-if="loading">
    <td colspan="5">
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    </td>
  </tr>
  <tr v-else class="trans-backg-color" v-bind:class="{ delete: deleteHover }">
    <template v-if="todo != undefined">
      <td v-bind:class="{ completed: todo.completed == 1 }">
          <span v-if="individualMode">
            {{ todo.description }}
          </span>
          <a :href="'/todo/' + todo.id" v-else>
            {{ todo.description }}
          </a>
      </td>
      <td>
        <input
          type="checkbox"
          :checked="todo.completed == 1 ? 'checked' : ''"
          @change="toggleTodo()">
      </td>
      <td>
        <button type="button"
          class="btn btn-xs btn-danger"
          @click="deleteToDo()"
          @mouseover="deleteHover = true"
          @mouseleave="deleteHover = false">
          <span class="glyphicon glyphicon-remove glyphicon-white"></span>
        </button>
      </td>
    </template>
  </tr>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ToDoComponent',
  props: {
    todo: Object,
  },
  data() {
    return {
      loading: false,
      individualMode: false,
      deleteHover: false,
    };
  },
  created() {
    this.getToDo();
  },
  methods: {
    getToDo() {
      if (this.todo) {
        this.loading = false;
        this.individualMode = false;
        return;
      }

      const path = window.location.pathname;
      const parts = path.split('/');
      const id = Number(parts[parts.length - 1]);

      if (!Number.isInteger(id)) {
        return;
      }

      this.loading = true;
      this.individualMode = true;

      axios.get(`/todo/${id}`)
        .then((response) => {
          this.loading = false;
          this.todo = response.data;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    toggleTodo() {
      axios.patch(`/todo/${this.todo.id}`)
        .then(() => {
          this.todo.completed = 1 - this.todo.completed;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteToDo() {
      axios.delete(`/todo/${this.todo.id}`)
        .then(() => {
          this.$emit('deleted', this.todo);
          this.todo = undefined;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
