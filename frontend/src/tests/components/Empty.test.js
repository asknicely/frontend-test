import React from 'react';
import { shallow } from 'enzyme';
import Empty from '../../components/Empty';

test('should render Empty correctly', () => {
	const wrapper = shallow(
		<Empty />
	);
	expect(wrapper).toMatchSnapshot();
});
