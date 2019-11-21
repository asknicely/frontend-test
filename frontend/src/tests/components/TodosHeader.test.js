import React from 'react';
import { shallow } from 'enzyme';
import TodosHeader from '../../components/TodosHeader';

test('should render TodosHeader correctly', () => {
	const wrapper = shallow(
		<TodosHeader />
	);
	expect(wrapper).toMatchSnapshot();
});
