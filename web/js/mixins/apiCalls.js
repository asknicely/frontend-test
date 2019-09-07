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
    }
}