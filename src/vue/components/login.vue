<template>
        <form class="md-layout login-form">
            <div class="login-form-background">
                <md-icon>lock</md-icon>
                <md-field :class="{'md-invalid' : loginError}">
                    <label>Username</label>
                    <md-input v-model="username" v-on:keyup.enter="$emit('login', username, password, '/')"></md-input>
                    <span class="md-error">{{loginError}}</span>
                </md-field>
                <md-field :class="{'md-invalid' : loginError}">
                    <label>Password</label>
                    <md-input v-model="password" type="password" v-on:keyup.enter="$emit('login', username, password, '/')"></md-input>
                    <span class="md-error">{{loginError}}</span>
                </md-field>
                <md-button class="md-raised md-primary" @click="$emit('login', username, password, '/')">Login</md-button>
            </div>
        </form>
</template>
<script>
    module.exports = {
        data: {username: "", password: ""},
        props: ['user', 'loginError']
    }
</script>