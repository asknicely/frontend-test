import React, { useReducer } from 'react';
import { shallow } from 'enzyme';
import TodosForm from '../../components/TodosForm';

test('should render TodosForm correctly', () => {

	const item = 2
	const wrapper = shallow(
		<TodosForm 
			description=""
			setDescription={(e)=>console.log(e.target.value)}
			handleSubmit={(e)=>console.log('handleSubmit')}		
		/>
	);

	expect(wrapper).toMatchSnapshot();
	
});
