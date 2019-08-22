import UserService from '../services/user'
const userService = new UserService('localhost:1337');

export default {
    namespaced: true,
    state: {
        id:undefined,
        username: undefined
    },
    
    getters:{
        getLoginedUser(state){
            return {id:state.id, username:state.username}
        },
        
    },
    
    mutations: {
        
        setUser (state, {id, username}) {
            state.id = id;
            state.username = username;
        }
    },
    actions: {  
        async login({commit}, {username, password}){
           const response =await userService.loginAsync({username, password});
           const user = JSON.parse(response.data);
           commit('setUser', {id:user.id, username: user.username});
           return response;
            
        }
    }
}