<template>
    <div class="todos__layout">
        <t-table title="Todo List:" :todoNumber="todoList.length">
          <t-table-row v-for="(todo, index) in todoList" :todo="todo" :key="index" @click="clickToDelete"></t-table-row>
        </t-table>
    </div>
</template>
<script>
import TTable from "./components/TTable.vue"
import TTableRow from './components/TTableRow.vue';
import apiCalls from './mixins/apiCalls.js';

export default {
  name: "app",
  components: {
    TTable,
    TTableRow
  },
  mixins: [ apiCalls ],
  data() {
      return {
        todoList: []
      }
  },
  beforeMount() {
    // get the todos list data from the twig template
    const id = "vue-todos"
    const node = document.getElementById(id)
    const props = JSON.parse(node.getAttribute('data-todos'))
    console.log('first', props)
    this.todoList = props;
  },
  methods: {
    async clickToDelete(todo) {
      console.log('123', todo)
      let result = await this.deleteTodo(todo.id)
      result ? this.updateFordelete(todo) : this.$toast.error('Something went wrong')
    },
    updateFordelete(todo) {
      let index = this.todoList.findIndex(x=>x.id == todo.id);
      this.todoList.splice(index, 1);
      this.$toast.success('Removed successfully.')
    }
  }
}
</script>