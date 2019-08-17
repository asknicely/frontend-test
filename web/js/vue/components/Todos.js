export default {
  data () {
    return {
      title: 'Todo List:',
      todos: [],
      baseurl: '',
      todoDescription: ''
    }
  },
  methods: {
    // Updates the dom by refreshing the contents of cart_items retrieved from the ajax api
    async load () {
      axios({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          url: '/todo',
          data: {}
        })
        .then(response => {
          if (response.status === 200) {
            this.todos = response.data
          } else {
            console.warn(response)
          }
        })
    },
    add () {
      axios({
          method: 'POST',
          url: `${this.baseurl}/todo/add`,
          headers: { 'Content-Type': 'application/json' },
          data: {
            'description': `${this.todoDescription}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.$bus.$emit('updateTodoEvent')
          } else {
            console.warn(response)
          }
        })
    },
    complete (id) {
      axios
        .post(`${this.baseurl}/todo/complete/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.$bus.$emit('updateTodoEvent')
          } else {
            console.warn(response)
          }
        })
    },
    remove (id) {
      axios
        .post(`${this.baseurl}/todo/delete/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.$bus.$emit('updateTodoEvent')
          } else {
            console.warn(response)
          }
        })
    }
  },
  async created () {
    this.load()
    this.baseurl = this.$attrs.baseurl
  },
  mounted () {
    this.$bus.$on('updateTodoEvent', () => {
      this.load()
    })
  }
}
