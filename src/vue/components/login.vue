<template>
        <form class="md-layout login-form">
            <div class="login-form-background">
                <md-icon>lock</md-icon>
                <md-field>
                    <label>Username</label>
                    <md-input v-model="username"></md-input>
                </md-field>
                <md-field>
                    <label>Password</label>
                    <md-input v-model="password" type="password"></md-input>
                </md-field>
                <md-button class="md-raised md-primary" @click="$emit('login', username, password, '/')">Login</md-button>
            </div>
        </form>
</template>
<script>
    module.exports = {
        data: {username: "", password: ""},
        props: ['user']
    }
</script>