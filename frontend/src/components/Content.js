import React from 'react'
import { Switch, Route } from "react-router-dom"
import Homepage from './Homepage'
import Login from './Login'
import Logout from './Logout'
import TodosDetail from './TodosDetail'
import Todos from './Todos'

const Content = (props) => {
	return (
		<div className="container">
			<div className="row">
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/logout" component={Logout} />
					<Route path="/todo/:id" component={TodosDetail} />
					<Route path="/todo"component={Todos} />
					<Route path="/" component={Homepage} />
				</Switch>
			</div>
		</div>
	)
}

export default Content