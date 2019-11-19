import React, { useReducer } from 'react';
import { Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { history } from './functions/History'
import { Context, initial, reducer } from './redux/app'

import Header from './components/Header';
import Content from './components/Content';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
	
	// redux codes
	const [state, dispatch] = useReducer(reducer, initial)

	return (
		<Context.Provider value={{ state, dispatch }}>
			<div className="App">
				<Router history={history}>
					<Header />
					<Content />
				</Router>
			</div>
			<ToastContainer />
		</Context.Provider>
	);
}

export default App;