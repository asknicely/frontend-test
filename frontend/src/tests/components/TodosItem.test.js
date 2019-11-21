import React, { useReducer } from 'react';
import { shallow } from 'enzyme';
import TodosItem from '../../components/TodosItem';
import TodosFixtures from '../fixtures/todos'

test('should render TodosItem correctly :: 2nd Item', () => {

	const item = 2
	const wrapper = shallow(
		<TodosItem 
			key={TodosFixtures[item].id}
			id={TodosFixtures[item].id}
			user={TodosFixtures[item].user_id}
			description={TodosFixtures[item].description}
			completed={TodosFixtures[item].completed}
			handleDelete={TodosFixtures[item].handleDelete}
			handleComplete={TodosFixtures[item].handleComplete}
			link={true}			
		/>
	);

	expect(wrapper).toMatchSnapshot();
	
});
