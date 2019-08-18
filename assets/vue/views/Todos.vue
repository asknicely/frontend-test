<template>
  <div class="col-md-4 col-md-offset-4">
    <h1>{{ title }}</h1>
    <table class="table table-striped">
      <tbody>
        <tr>
          <th width="54"></th>
          <th>#</th>
          <th>Description</th>
          <th>User</th>
          <th></th>
        </tr>
        <TodoItem
          v-for="(todo, idx) in orderedtodos"
          @update-todos="load()"
          :key="idx"
          :id="todo.id"
          :user_id="todo.user_id"
          :description="todo.description"
          :completed="todo.completed"
          :baseurl="baseurl"
        />
        <tr>
          <td colspan="4">
            <input
              v-model="todoDescription"
              type="text"
              name="description"
              class="small-6 small-center"
              placeholder="Description..."
            />
          </td>
          <td>
            <button
              v-if="todoDescription"
              @click="add()"
              class="btn btn-sm btn-primary"
            >
              Add
            </button>
            <button
              v-else
              type="submit"
              disabled
              class="btn btn-sm btn-primary disabled"
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import lodash from "lodash";
import TodoMixin from "../lib/Misc/TodoMixin";
import TodoItem from "../components/TodoItem";

export default {
  name: "Todos",
  mixins: [TodoMixin],
  components: { TodoItem },
  computed: {
    orderedtodos() {
      return _.orderBy(this.todos, "id");
    }
  },
  data() {
    return {
      title: "Todo List:",
      baseurl: ""
    };
  },
  watch: {
    todos: {
      handler(val) {
        this.todos = val;
      },
      immediate: true
    }
  },
  created() {
    this.baseurl = this.$attrs.baseurl;
    this.load();
  }
};
</script>
<style type="text/css">
input[type=text] {
  padding: .5rem 1rem;
}
</style>
