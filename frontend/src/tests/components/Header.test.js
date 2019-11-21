import React, { useReducer } from 'react';
import { Router } from "react-router-dom";
import { shallow, mount, render } from 'enzyme';
import Header from '../../components/Header';
import { initial, Context, reducer } from '../../redux/app'
import { history } from '../functions/History'


test('should render Header correctly and display LOGIN link ', () => {

	const state = {}
	const App = (props) => {
		// const [state, dispatch] = useReducer(reducer, initial)
		return (
			<Context.Provider value={{ state }}>
				<Router history={history}>
					<Header />
				</Router>
			</Context.Provider>
		);
	}

	const wrapper = mount(<App />);
	expect(wrapper).toMatchSnapshot();
	
});


test('should render Header correctly and display STATE.username and LOGOUT link ', () => {

	const state = { username: 'User123' }
	const App = (props) => {
		// const [state, dispatch] = useReducer(reducer, initial)
		return (
			<Context.Provider value={{ state }}>
				<Router history={history}>
					<Header />
				</Router>
			</Context.Provider>
		);
	}

	const wrapper = mount(<App />);
	expect(wrapper).toMatchSnapshot();
	
});
