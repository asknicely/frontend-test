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

                    <button>login</button>
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
        },
        components: {
            'Nav-Component': Nav
        }
    }
</script>

