export default function (userService){
    return {
        namespaced: true,
        state: {
            id: undefined,
            username: undefined
        },

        getters: {
            getLoginedUser(state) {
                return {id: state.id, username: state.username}
            },

        },

        mutations: {
            setUser(state, {id, username}) {
                state.id = id;
                state.username = username;
            }
        },
        actions: {
            async login({commit}, {username, password}) {
                const response = await userService.loginAsync({username, password});
                const user =response.data;
                commit('setUser', {id: user.id, username: user.username});
                return response;
            },
            logout({commit}) {
                commit('setUser', {id: undefined, username: undefined});
            }
        }
    }
}