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
  }
}
</script>