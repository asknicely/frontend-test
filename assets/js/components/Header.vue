<template>
	<BNavbar type="dark" variant="dark">
		<div class="container px-0">
			<BNavbarNav>
				<BNavItem to="/">
					<BIconHouseFill></BIconHouseFill>
					<BNavText>Home</BNavText>
				</BNavItem>

				<BNavItem v-if="user" to="/todo">
					<BIconListCheck></BIconListCheck>
					<BNavText>Todo</BNavText>
				</BNavItem>
			</BNavbarNav>
			<BNavbarNav class="ml-auto">
				<BButton v-if="user" @click="logout">
					<span>Logout {{ username }}</span>
				</BButton>
				<BNavItem v-else to="/login">
					<BButton class="login-btn">
						<BIconBoxArrowRight></BIconBoxArrowRight>
						<span>Login</span>
					</BButton>
				</BNavItem>
			</BNavbarNav>
		</div>
	</BNavbar>
</template>

<script>
import {
	BNavbar,
	BNavbarNav,
	BNavItem,
	BNavText,
	BIconHouseFill,
	BIconListCheck,
	BButton,
	BIconBoxArrowRight,
} from 'bootstrap-vue';
import { mapState, mapActions } from 'vuex';
import { axiosRequest } from "../utils/fetch.utils";

export default {
	name : "Header",
	components: {
		BNavbar,
		BNavbarNav,
		BNavItem,
		BNavText,
		BIconHouseFill,
		BIconListCheck,
		BButton,
		BIconBoxArrowRight
	},
	computed: {
		...mapState(['user']),

		username () {
			return this.user?.username || ''
		}
	},
	methods: {
		...mapActions(['removeAuth', 'removeToken']),

		logout () {
			axiosRequest('GET', '/api/logout')
				.then(([error, data]) => {
					if (error) {
					} else {
						if (data.success) {
							const toast = {
								message : 'Bye!',
								title   : 'Logout success'
						  	}
							this.removeAuth();
							this.removeToken();
							this.$router.push('/login');
					  		this.showToast(toast, 'primary')
            			}
					}
				})
		}
	}
}
</script>

<style lang="scss">
	.btn {
		&.login-btn {
			span {
				max-width: 0;
				display: inline-flex;
				white-space: nowrap;
				transition: max-width 0.5s;
				overflow: hidden;
			}
			&:hover, &:focus {
				span {
					max-width: 100px;
				}
			}
		}
	}
</style>
