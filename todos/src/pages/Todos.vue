<template>
    <div>
        <!--Navbar -->
           <Nav-Component></Nav-Component>
        <!--/.Navbar -->
        <div class="login-page">
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
    
    export default {
        name: 'Todos',
    components: {
        'Nav-Component': Nav
    }
    }
</script>

