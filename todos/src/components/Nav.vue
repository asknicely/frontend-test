<template>
    <div>
        <b-navbar toggleable="lg" type="dark" style="background:#4CAF50">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>


                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>{{this.getLoginedUser.username}}</em></template>
                        <b-dropdown-item @click.prevent="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>
<script>
    import { mapGetters } from "vuex";
    export default {
        name: 'Todos',
        computed: {
            ...mapGetters("user", ["getLoginedUser"])
        },
        methods:{
             logout(){
                 this.$store.dispatch('user/logout');
                 this.$router.push('/')
            }
        }
    }
</script>