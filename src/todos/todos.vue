<template>
  <div id="todos-loading" v-if="loading">
    <i class="glyphicon glyphicon-refresh spinner"></i>
  </div>
  <table id="todos-table" class="table table-striped">
    <th class="text-center" style="width: 10%">#</th>
    <th class="text-center" style="width: 10%">User</th>
    <th>Description</th>
    <th class="text-center" style="width: 10%">Complete</th>
    <th class="text-center" style="width: 10%">Delete</th>
    <tr v-if="todos.length === 0">
      <td class="text-center" colspan="5">
        <h6>Add a Todo below</h6>
      </td>
    </tr>
    <tbody>
      <tr v-for="todo in todos" :key="todo.id" data-test="todo">
        <td class="text-center">{{ todo.id }}</td>
        <td class="text-center">{{ todo.username }}</td>
        <td>
          <button @click="openTodo(todo)" class="btn btn-link">
            {{ todo.description }}
          </button>
        </td>
        <td class="text-center">
          <button
            @click="completeTodo(todo.id)"
            class="btn btn-link"
            data-test="completeTodo"
          >
            <i
              class="glyphicon"
              :class="
                isCompleting(todo.id)
                  ? 'glyphicon-refresh spinner'
                  : todo.completed === '1'
                  ? 'glyphicon-check'
                  : 'glyphicon-unchecked'
              "
            ></i>
          </button>
        </td>
        <td class="text-center">
          <button
            @click="deleteTodo(todo.id)"
            class="btn btn-link"
            data-test="deleteTodo"
          >
            <i
              class="glyphicon text-danger"
              :class="
                isDeleting(todo.id)
                  ? 'glyphicon-refresh spinner'
                  : 'glyphicon-trash'
              "
            ></i>
          </button>
        </td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td colspan="3">
          <input
            v-model="description"
            type="textbox"
            class="form-control"
            placeholder="Enter description"
          />
        </td>
        <td colspan="2">
          <button
            @click="createTodo"
            class="btn btn-primary btn-block"
            :disabled="!description.length"
          >
            <i v-if="creating" class="glyphicon glyphicon-refresh spinner"></i>
            <span v-else>Add</span>
          </button>
        </td>
      </tr>
    </tfoot>
  </table>

  <div class="modal fade" id="todo-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-if="todo">
        <div class="modal-header">
          <button @click="closeTodo()" class="close">
            <span>&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">Todo #{{ todo.id }}</h4>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-xs-10">
              <input
                v-model="todo.description"
                type="textbox"
                class="form-control"
                placeholder="Enter description"
              />
            </div>
            <div class="col-xs-2">
              <button
                v-if="todo.completed === '1'"
                @click="todo.completed = '0'"
                class="btn btn-link"
              >
                <i class="glyphicon glyphicon-check"></i>
              </button>

              <button v-else @click="todo.completed = '1'" class="btn btn-link">
                <i class="glyphicon glyphicon-unchecked"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            @click="deleteTodo(todo.id)"
            class="btn btn-danger pull-left btn-min"
          >
            <span v-if="isDeleting(todo.id)">
              <i class="glyphicon glyphicon-refresh spinner"></i>
            </span>
            <span v-else>Delete</span>
          </button>
          <button @click="closeTodo()" class="btn btn-default btn-min">
            Cancel
          </button>
          <button
            @click="updateTodo(todo)"
            class="btn btn-primary btn-min"
            :disabled="todo.description.length === 0"
          >
            <span v-if="isUpdating(todo.id)">
              <i class="glyphicon glyphicon-refresh spinner"></i>
            </span>
            <span v-else>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    BASE_URL: { type: String, default: "" },
    OPEN_TODO_ID: { type: String, default: "" },
  },
  data() {
    return {
      loading: true,
      creating: false,
      updating: [],
      completing: [],
      deleting: [],
      todos: [],
      todo: null,
      description: "",
    };
  },

  methods: {
    async getTodos() {
      try {
        const res = await axios.request({
          method: "get",
          url: `${this.BASE_URL}/todo`,
          headers: { "Content-Type": "application/json" },
          data: null,
        });

        this.todos = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async createTodo() {
      try {
        this.creating = true;

        const res = await axios.request({
          method: "post",
          url: `${this.BASE_URL}/todo`,
          headers: { "Content-Type": "application/json" },
          data: { description: this.description },
        });
        this.description = "";
        this.todos = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.creating = false;
      }
    },

    async updateTodo(todo) {
      try {
        this.updating.push(todo.id);

        const res = await axios.request({
          method: "patch",
          url: `${this.BASE_URL}/todo/${todo.id}/update`,
          headers: { "Content-Type": "application/json" },
          data: todo,
        });

        this.todos = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.updating = this.updating.filter((_id) => _id !== todo.id);
        this.closeTodo();
      }
    },

    async completeTodo(id) {
      try {
        this.completing.push(id);

        const res = await axios.request({
          method: "patch",
          url: `${this.BASE_URL}/todo/${id}/complete`,
          headers: { "Content-Type": "application/json" },
          data: null,
        });

        this.todos = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.completing = this.completing.filter((_id) => _id !== id);
      }
    },

    async deleteTodo(id) {
      try {
        this.deleting.push(id);

        const res = await axios.request({
          method: "delete",
          url: `${this.BASE_URL}/todo/${id}`,
          headers: { "Content-Type": "application/json" },
          data: null,
        });

        this.todos = res.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.deleting = this.deleting.filter((_id) => _id !== id);
        this.closeTodo();
      }
    },

    openTodo(todo) {
      this.todo = Object.assign({}, todo);
      $("#todo-modal").modal("show");
    },

    closeTodo() {
      if (this.OPEN_TODO_ID) window.location = `${this.BASE_URL}/todo`;
      else {
        $("#todo-modal").modal("hide");
        this.todo = null;
      }
    },

    isUpdating(id) {
      return this.updating.includes(id);
    },

    isCompleting(id) {
      return this.completing.includes(id);
    },

    isDeleting(id) {
      return this.deleting.includes(id);
    },
  },

  async mounted() {
    await this.getTodos();

    if (this.OPEN_TODO_ID) {
      const todo = this.todos.find((todo) => todo.id === this.OPEN_TODO_ID);
      this.openTodo(todo);
    }
  },
};
</script>
