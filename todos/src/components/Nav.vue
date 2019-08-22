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
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>
<script>
 
    import { mapGetters } from "vuex";
    export default {
  computed: {
    ...mapGetters("user", ["getLoginedUser"])
    },
        mounted(){
      console.log('adfa', this.getLoginedUser);
        },
        methods:{
            async logout(){
                
            }
        }
    }
</script>