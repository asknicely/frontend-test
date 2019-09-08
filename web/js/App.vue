<template>
    <div class="todos__layout">
        <t-table title="Todo List:" :todoNumber="todoList.length">
          <t-table-row v-for="(todo, index) in todoList" :todo="todo" :key="index" @changeStatus="changeStatus" @click="clickToDelete"></t-table-row>
        </t-table>
        <br/><br/>
        <t-form :model="model" :rules="rules" title="Add New Todo">
          <t-input ref="tInput" placeholder="Description" prop="newTodo" v-model="model.newTodo"></t-input>
          <t-button primary :loading="loading" type="submit" @submit="clickToAdd" @click="clickToAdd" label="add"></t-button>
        </t-form>
    </div>
</template>
<script>
import TTable from "./components/TTable.vue"
import TTableRow from './components/TTableRow.vue';
import apiCalls from './mixins/apiCalls.js';
import TButton from "./components/commons/TButton.vue"
import TInput from './components/commons/TInput.vue';
import TForm from './components/TForm.vue';

export default {
  name: "app",
  components: {
    TTable,
    TTableRow,
    TButton,
    TInput,
    TForm
  },
  mixins: [ apiCalls ],
  data() {
      return {
        todoList: [],
        loading: false, // add loading status to avoid double click when user add a TODO
        model: { newTodo: '' },
        rules: {
          newTodo: [
            { required: true, message: "Please input content" },
            { min: 2, message: 'Two characters at least'}
          ]
        }
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
    clickToDelete(todo) {
      this.axios.post(`/todo/delete/${todo.id}`, { headers: {  "Content-Type": 'application/json' } }).then(response => {
        if(response.data.hasOwnProperty('success')) this.updateAfterDelete(todo)
      }).catch(error => {
        console.log(error)
        this.$toast.error('Something went wrong')
      });
    },
    updateAfterDelete(todo) {
      // update the list data when delete operation succeeded
      let index = this.todoList.findIndex(x=>x.id == todo.id);
      this.todoList.splice(index, 1);
      this.$toast.success('Removed successfully.')
    },
    clickToAdd() {
      if(this.model.newTodo.length<2) return this.$refs.tInput.validator()
      this.loading = true;
      let newTodo = {"description": this.model.newTodo}
      this.axios.post('/todo/add', newTodo, { headers: {  "Content-Type": 'application/json' } }).then(response => {
        if(response.data.hasOwnProperty('success')) {
          this.todoList = response.data.data
          this.model.newTodo = '';
          this.$toast.success('Added successfully.')
        } 
      }).catch(error => {
        console.log(error)
        this.$toast.success('Removed successfully.')
      });
      this.loading = false;
    },
    changeStatus(todo) {
      this.axios.post(`/todo/complete/${todo.id}`, { headers: {  "Content-Type": 'application/json' } }).then(response => {
        if(response.data.hasOwnProperty('success')) {
          this.todoList = response.data.data
          this.$toast.success('Great, you completed one todo!')
        }
      }).catch(error => {
        console.log(error)
        this.$toast.error('Something went wrong')
      });
    }
  },
}
</script>