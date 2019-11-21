import React from 'react';
import { shallow } from 'enzyme';
import Content from '../../components/Content';

test('should render Content correctly', () => {
	const wrapper = shallow(
		<Content />
	);
	expect(wrapper).toMatchSnapshot();
});
