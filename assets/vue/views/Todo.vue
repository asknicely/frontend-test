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
          @update-todo="getTodo()"
          :id="todo.id"
          :user_id="todo.user_id"
          :description="todo.description"
          :completed="todo.completed"
          :baseurl="baseurl"
        />
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import lodash from "lodash";
import TodoMixin from "../lib/Misc/TodoMixin";
import TodoItem from "../components/TodoItem";

export default {
  name: "Todo",
  components: { TodoItem },
  mixins: [ TodoMixin ],
  computed: {
    orderedtodos() {
      return _.orderBy(this.todos, "id");
    }
  },
  data() {
    return {
      title: "Todo:",
      id: "",
      todo: {}
    };
  },
  created() {
    this.baseurl = this.$attrs.baseurl;
    this.id = this.$attrs.todo_id;
    this.getTodo(this.id);
  }
};
</script>
<style type="text/css">
input[type=text] {
  padding: .5rem 1rem;
}
</style>
