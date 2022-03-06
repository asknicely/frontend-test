<template>
  <section>
    <TransitionGroup name="fade" tag="ul" class="container">
      <div v-for="item in list" :key="item.id" class="todo-list">
        <TodoItem
          :item="item"
          @complete="$store.commit('markComplete', item.id)"
          @delete="$store.commit('deleteTodo', item.id)"
        />
      </div>
    </TransitionGroup>
    <div class="todo-add">
      <form ref="addTodo" method="post" action="/todo/add">
        <input
          type="textbox"
          name="description"
          placeholder="Description..."
          v-model="todo"
        />
      </form>
      <button @click="addTodo">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
  </section>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
  name: "TodoList",
  data() {
    return {
      todo: "",
    };
  },
  mounted() {
    this.$store.commit("getTodos");
  },
  methods: {
    addTodo() {
      if (this.todo.length > 0) {
        this.$refs.addTodo.submit();
      }
    },
  },
  computed: {
    list() {
      return this.$store.state.todoList;
    },
  },
};
</script>
