import { shallowMount } from '@vue/test-utils'
import TodoList from "../../assets/js/pages/TodoList";

describe('TodoList.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(TodoList);
	});

	it('TodoList.vue renders successfully.', () => {
		expect(wrapper.exists()).toBe(true)
		expect(wrapper.find('#todo').exists()).toBe(true)
	});
})
