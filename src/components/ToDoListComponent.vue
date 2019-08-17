<template>
  <div class="todo-container">
    <h1>My Todo List:</h1>
    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th>Description</th>
          <th>Completed</th>
          <th></th>
        </tr>
        <template v-if="loading">
          <tr>
            <td colspan="5">
              <div class="loader-container">
                <div class="loader"></div>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <template v-for="todo in todos">
            <ToDoComponent
              :todo="todo"
              :value="todo"
              :key="todo.id"
              @deleted="showDeletedAlert($event)" />
          </template>
        </template>
        <tr>
          <td colspan="2">
            <div class="form-group has-feedback" v-bind:class="{ 'has-error': invalidDescription }">
              <input
                type="textbox"
                name="description"
                class="form-control small-6 small-center"
                placeholder="Description..."
                v-model="description"
                @keyup="validateDescription()"
                @keyup.enter="addToDo()">
              <span class="glyphicon glyphicon-remove form-control-feedback"
                v-if="invalidDescription"></span>
            </div>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="addToDo()">
              Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import ToDoComponent from './ToDoComponent.vue';

export default {
  name: 'ToDoListComponent',
  components: {
    ToDoComponent,
  },
  data() {
    return {
      loading: false,
      todos: [],
      description: '',
      invalidDescription: false,
    };
  },
  created() {
    this.getToDos();
  },
  methods: {
    getToDos() {
      this.loading = true;

      axios.get('/todo')
        .then((response) => {
          this.loading = false;
          this.todos = response.data;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    showDeletedAlert(todo) {
      this.showAlert(`Todo '${todo.description}' deleted`);
    },
    validateDescription() {
      this.invalidDescription = (this.description === undefined
        || this.description === null
        || this.description === '');
    },
    addToDo() {
      this.validateDescription();

      if (this.invalidDescription) {
        return;
      }

      axios.post('/todo/add', {
        description: this.description,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          this.showAlert(`Todo '${this.description}' added`);
          this.description = '';
          this.invalidDescription = false;
          this.getToDos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAlert(message) {
      const el = document.createElement('div');

      el.appendChild(document.createTextNode(message));

      el.classList.add('alert');
      el.classList.add('alert-success');
      el.classList.add('fade');

      const containerEl = document.getElementById('alert-container');

      // insert latest alerts at the top so earlier alerts pushed down fade out in a trail effect
      containerEl.insertBefore(el, containerEl.childNodes[0]);

      // fade in alert
      el.classList.add('in');

      // fade out alert after 3 seconds
      window.setTimeout(() => {
        el.classList.remove('in');

        window.setTimeout(() => {
          // remove element after fade out is complete
          containerEl.removeChild(el);
        }, 300);
      }, 3000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../styles/main.scss';
</style>
