export default {
    // Here are all the AJAX call methods
    methods: {
      // delete tofo from list
      deleteTodo(id) {
        this.axios.post(`/todo/delete/${id}`, { headers: {  "Content-Type": 'application/json' } }).then(response => {
          console.log('response', response)
          if(response.data.hasOwnProperty('success')) return true
          return false
        }).catch(error => {
          console.log(error)
          return false
        });
      },
      // add todo to list
      addTodo(description) {
        let newTodo = {"description": description}
        console.log('123', newTodo)
        this.axios.post('/todo/add', newTodo, { headers: {  "Content-Type": 'application/json' } }).then(response => {
          console.log('response', response, response.data)
          if(response.data.hasOwnProperty('success')) return response.data.data
          return []
        }).catch(error => {
          console.log(error)
          return []
        });
      },
      // change the todo to completed state
      completeTodo(id) {
        this.axios.post(`/todo/complete/${id}`, { headers: {  "Content-Type": 'application/json' } }).then(response => {
          console.log('response', response)
        }).catch(error => {
          console.log(error)
        });
      },
    }
}