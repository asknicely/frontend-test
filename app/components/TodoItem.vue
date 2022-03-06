<template>
  <div class="todo-item" :class="{ 'item-complete': complete }">
    <h2 class="todo-item-title">{{ item.description }}</h2>
    <div class="todo-actions">
      <button @click="$emit('complete')" v-if="!complete">
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
      <button @click="$emit('delete')">
        <font-awesome-icon icon="fa-solid fa-trash-can" />
      </button>
    </div>
  </div>
</template>

<script>
//i used emits above to allow for this component to be re-useable outside this context
//the same also enables the parent components control over the actions

export default {
  name: "TodoItem",
  props: ["item"],
  computed: {
    complete() {
      return this.item.completed;
    },
  },
};
</script>
