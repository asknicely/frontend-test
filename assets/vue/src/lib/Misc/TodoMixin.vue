<script>
import axios from 'axios'

export default {
  name: 'Todo',
  data () {
    return {
      todos: [],
      activeId: null,
      todoDescription: ''
    }
  },
  methods: {
    load () {
      /*
        init todo list
      */
      axios({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        url: '/todo',
        data: {}
      }).then(response => {
        if (response.status === 200) {
          this.todos = response.data
        } else {
          console.warn(response)
        }
      })
    },
    add () {
      /*
        creates new todo
      */
      let bodyFormData = new FormData()
      bodyFormData.set('description', this.todoDescription)
      axios({
        method: 'POST',
        url: `${this.baseurl}/todo/add`,
        headers: { 'Content-Type': 'application/json' },
        data: bodyFormData
      }).then(response => {
        if (response.status === 200) {
          this.todoDescription = ''
          this.load()
        } else {
          console.warn(response)
        }
      })
    },
    complete (id) {
      /*
        completes todo
      */
      axios({
        url: `${this.baseurl}/todo/complete/${id}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {}
      }).then(response => {
        if (response.status === 200) {
          this.$emit('update-todos')
        } else {
          console.warn(response)
        }
      })
    },
    remove (id) {
      /*
        removes todo
      */
      axios.post(`${this.baseurl}/todo/delete/${id}`).then(response => {
        if (response.status === 200) {
          this.$emit('update-todos')
          this.$emit('update:activeId', null)
        } else {
          console.warn(response)
        }
      })
    }
  }
}
</script>
