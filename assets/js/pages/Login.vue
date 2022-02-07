<template>
	<div id="login" class="col mt-4" @keypress.enter="login">
		<h1 class="text-center mb-5">Login</h1>

		<div class="login-group">
			<input class="input" type="text" required id="username" v-model="username">
			<label for="username">Username</label>
		</div>

		<div class="login-group">
			<input class="input" type="password" required id="password" v-model="password">
			<label for="password">Password</label>
			<span class="bar"></span>
		</div>
		<BButton class="text-center" :disabled="!validated" @click="login">Login</BButton>
	</div>
</template>

<script>
import { BButton } from 'bootstrap-vue';
import {axiosRequest} from "../utils/fetch.utils";
import { mapActions, mapState } from "vuex";

export default {
	name : "Login",
	components: {
		BButton
	},
	computed: {
		...mapState(['user']),

		validated () {
			return this.username !== '' && this.password !== '';
		}
	},
	data () {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		...mapActions(['setAuth', 'setToken']),

		login () {
			if (!this.validated) return false;

			this.requestToken()
				.then(() => {
					axiosRequest(
						'GET',
						'/api/login',
						{
							username : this.username,
							password : this.password
						}
					)
						.then(([error, data]) => {
							if (error) {
								this.showError(error)
							} else {
								const { username } = data
								const toast = {
									message : `Welcome ${username}!`,
									title   : 'Login success'
								}
								this.setAuth(data);
								this.$router.push({ path: 'todo' })
								this.showToast(toast, 'primary')
							}
						})
				})
		},

		requestToken () {
			return new Promise(((resolve, reject) => {
				axiosRequest(
					'GET',
					'/api/requestAuth'
				)
					.then(([error, data]) => {
						if (error) {
							this.showError(error)
							reject()
						} else {
							if (data && data.token) {
								this.setToken(data.token)
								resolve()
							} else {
								const toast = {
									message	: 'Cannot retrieve token.',
									title	: 'Request token error'
								}
								this.showToast(toast, 'danger')
								reject()
							}
						}
					})
			}))
		}
	}
}
</script>

<style lang="scss">
	#login {
		display: flex;
		flex-direction: column;
		align-items: center;
		.login-group {
			position: relative;
			margin-bottom: 35px;
			input {
				border: none;
				border: 1px solid #ccc;
				border-radius: 4px;
				padding: 10px 15px;
				min-width: 300px;
				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-webkit-autofill:active{
					-webkit-box-shadow: 0 0 0 30px white inset !important;
				}
			}
			label {
				position: absolute;
				left: 0;
				top: -15px;
				transform: scale(0.75);
				z-index: 2;
				overflow: hidden;
				background: #FFF;
				padding: 0 5px;
				color: #737070;
			}
		}
	}
</style>
