<template>
    <div>
        <!--Navbar -->
           <Nav-Component></Nav-Component>
        <!--/.Navbar -->
        <b-alert
                :show="dismissCountDown"
                dismissible
                variant="success"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
        >
           {{todoTitle}} is removed
        </b-alert>
        <div class="login-page todo">
            <div class="form">
                <table class="table table-striped">
                    <th>#</th>
                    <th>User</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th></th>
                    
                    <Todo-Component v-for="(todo, index) in getTodos" v-bind:todo="todo" @onDeleted='showAlert(todo)'>
                      
                    </Todo-Component>
                    <TodoAdd-Component></TodoAdd-Component>
                 
                </table>
                
            </div>
        </div>
    </div>
    
</template>

<script>
    import Nav from '../components/Nav.vue'
    import Todo from '../components/Todo.vue'
    import TodoAdd from '../components/TodoAdd.vue'
    import { mapGetters } from "vuex";
    export default {
        name: 'Todos',
        computed: {
            ...mapGetters("user", ["getLoginedUser"]),
            ...mapGetters("todos", ["getTodos"])
        },
        data(){
            return {
                dismissCountDown: 0,
            }
        },
        mounted(){
            if(!this.getLoginedUser.id&&!this.getLoginedUser.username){
                this.$router.push('/');
            }
            this.$store.dispatch('todos/getTodosAsync');

        },
        methods:{
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
                if(dismissCountDown===0) {
                    this.todoTitle = null;
                }
            },
            showAlert(todo){
                this.dismissCountDown=5;
                this.todoTitle=todo.description; 
            }
        },
        components: {
            'Nav-Component': Nav,
            'Todo-Component':Todo,
            'TodoAdd-Component':TodoAdd,
            
        }
    }
</script>

