<template>
    <div>
        <!--Navbar -->
           <Nav-Component></Nav-Component>
        <!--/.Navbar -->
        <div class="login-page todo">
            <div class="form">
                <form class="login-form">
                    <input type="text" placeholder="username"/>
                    <input type="password" placeholder="password"/>
                    fadsfafasf

                    <button v-on:click="test">login</button>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
    import Nav from '../components/Nav.vue'
    import { mapGetters } from "vuex";
    export default {
        name: 'Todos',
        computed: {
            ...mapGetters("user", ["getLoginedUser"])
        },
        mounted(){
            if(!this.getLoginedUser.id&&!this.getLoginedUser.username){
                this.$router.push('/');
            }
            this.$store.dispatch('todos/getTodos')
        },
        
        methods:{
            test(){
                console.log('test');
                this.$store.dispatch('todos/getTodos')
            }
        },
        
        components: {
            'Nav-Component': Nav
        }
    }
</script>

