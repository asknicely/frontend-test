import React, { useContext, useEffect } from 'react'
// import { history } from '../functions/History'
import { Context } from '../redux/app'

const Logout = (props) => {

	const { state, dispatch } = useContext(Context)

	const handleLogout = (e) => {

		localStorage.setItem('token', '')
		localStorage.setItem('username', '')
		localStorage.setItem('isLoggedIn', false)
		
		dispatch({ type: 'DO_LOGOUT' })
		props.history.push('/login')

	}

	useEffect(() => { if (state.isLoggedIn) handleLogout() })


	return (
		<div></div>
	)
	
}

export default Logout