import React, { useReducer } from 'react';
import { shallow, mount, render } from 'enzyme';
import Login from '../../components/Login';
import { initial, Context, reducer } from '../../redux/app'

const App = (props) => {
	const [state, dispatch] = useReducer(reducer, initial)
	return (
		<Context.Provider value={{ state, dispatch }}>
			<Login />
		</Context.Provider>
	);
}

test('should render Login correctly', () => {

	const wrapper = mount(<App />);
	expect(wrapper).toMatchSnapshot();
	
});


test('should give error on Login without filling user / pass', () => {

	const wrapper = mount(<App />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }
	});

	// make sure username has 'input-error' css class
	expect(wrapper.find('input').at(0).hasClass('input-error')).toBe(true);

	// make sure password has 'input-error' css class
	expect(wrapper.find('input').at(0).hasClass('input-error')).toBe(true);
	expect(wrapper).toMatchSnapshot();
	
});