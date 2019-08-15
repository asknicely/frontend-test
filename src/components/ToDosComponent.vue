<template>
  <div class="col-md-4 col-md-offset-4">
    <h1>My Todo List:</h1>
    <table class="table table-striped">
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
            <ToDoComponent :todo="todo" :value="todo" :key="todo.id" />
          </template>
        </template>
        <tr>
          <td colspan="2">
            <div class="form-group">
              <input
                type="textbox"
                name="description"
                class="form-control small-6 small-center"
                placeholder="Description..."
                v-model="description">
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-sm btn-primary" @click="addToDo()">Add</button>
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
  name: 'ToDosComponent',
  components: {
    ToDoComponent,
  },
  data() {
    return {
      loading: false,
      todos: [],
      description: '',
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
    addToDo() {
      axios.post(`/todo/add?description=${this.description}`)
        .then(() => {
          this.getToDos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .loader-container {
    min-height: 100px;
    position: relative;
    width: 100%;
  }

  .loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #555;
    left: calc(50% - 25px);
    position: absolute;
    top: calc(50% - 25px);
    width: 50px;
    height: 50px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .completed {
    text-decoration: line-through;
  }
</style>
