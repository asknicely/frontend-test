import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { Context } from '../redux/app'

const Header = (props) => {

	const { state } = useContext(Context)

	return (
		<nav className="navbar navbar-inverse navbar-fixed-top">
			<div className="container">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">
						<span className="glyphicon glyphicon-home glyphicon-white"></span>
					</Link>
				</div>
				<div id="navbar" className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li><Link to="/todo">Todo list</Link></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						
						<li style={{ display: state.token ? 'block' : 'none '}}>
							<Link to="/logout">

								<span className="glyphicon glyphicon-user custom-span"></span>
								{state.username} 
								
								<span className="glyphicon glyphicon-off custom-span"></span> 
								Logout

							</Link>
						</li>
					
						<li style={{ display: state.token ? 'none' : 'block'}}>
							<Link to="/login">Login</Link>
						</li>
						
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Header