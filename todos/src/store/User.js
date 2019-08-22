export default {
    namespaced: true,
    state: {
        id:1,
        username: 'username'
    },
    mutations: {  },
    actions: {  
        login({}, {username, password}){
            console.log(username, password)
            
        }
    }
}