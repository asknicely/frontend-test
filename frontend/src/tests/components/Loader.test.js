import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../components/Loader';

test('should render Loader correctly', () => {
	const wrapper = shallow(
		<Loader />
	);
	expect(wrapper).toMatchSnapshot();
});
