<template>
    <div class="login-page">
        <div class="form">
            <form class="login-form" @submit.prevent="login()">
                <div class="input-group"
                     v-bind:class="{ error: errors.first('Username') }">
                    <input type="text" v-validate="'required'" placeholder="username" name="Username" v-model="formData.username"/>
                    <div class="error-message">{{ errors.first('Username') }} </div>
                </div>

                <div class="input-group"
                        v-bind:class="{ error: errors.first('Password') }">
                <input type="password" v-validate="'required'" placeholder="password"  name="Password" v-model="formData.password"/>
                <div class="error-message">{{ errors.first('Password') }}</div>
                </div>
                <div class="input-group"  v-bind:class="{ error: this.hasServerError }">
                <div class="error-message">User not found or your password is not correct.</div>
                </div>
                <button class='formbtn' type="submit" value="Submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                formData: {
                    username: undefined,
                    password: undefined
                },
                hasServerError:false
            };
        },
        methods:{
            async login(){

               const isValid = await this.$validator.validate();
               this.hasServerError=false;
               if(isValid){
                   try {
                       const response = await this.$store.dispatch('user/login',
                           {username: this.formData.username, password: this.formData.password});
                       this.$router.push({ name: 'todos' });
                   }
                   catch (e) {
                       console.log(e);
                       this.hasServerError=true
                   }
               }
            }
        }
    }
</script>

