import { shallowMount } from '@vue/test-utils'
import Login from "../../assets/js/pages/Login";

describe('Login.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Login);
	});

	it('Login.vue renders successfully.', () => {
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.find('#login').exists()).toBe(true)
	});

	it('Computed properties working as expected.', () => {
		const testUser = {
			username: 'test',
			password: 'testP'
		}
		wrapper.setData({ username: testUser.username });
		expect(wrapper.vm.validated).toBe(false);

		wrapper.setData({ username: testUser.username, password: testUser.password });
		expect(wrapper.vm.validated).toBe(true);

	})
})
