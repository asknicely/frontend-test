import { shallowMount } from '@vue/test-utils'
import Confirm from "../../assets/js/components/Confirm";

describe('Confirm.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Confirm);
	});

	it('Confirm.vue renders successfully.', () => {
		expect(wrapper.exists()).toBe(true)
	});

	it('Computed properties working as expected.', () => {
		const modal = {
			title		: 'testTitle',
			body		: 'testBody',
			data		: {
				user_id		: 1,
				description	: 'testDesc',
			},
			confirmText	: 'testText'
		}
		wrapper.setProps({ modal });
		expect(wrapper.vm.title).toBe(modal.title);
		expect(wrapper.vm.body).toBe(modal.body);
		expect(wrapper.vm.user).toBe(modal.data.user_id);
		expect(wrapper.vm.description).toBe(modal.data.description);
		expect(wrapper.vm.confirmText).toBe(modal.confirmText);
	})
})
