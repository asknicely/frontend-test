import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Context } from '../redux/app'

const Login = (props) => {

	const defaultValue = {
		value: '',
		error: false
	}
	const [username, setUsername] = useState(defaultValue)
	const [password, setPassword] = useState(defaultValue)
	const { state, dispatch } = useContext(Context)

	const handleSubmit = async (e) => {

		e.preventDefault()
		var formError = 0

		if (!username.value) {
			formError++
			setUsername({...username, error: true})
		}

		if (!password.value) {
			formError++
			setPassword({...password, error: true})
		}

		if (formError) {
			toast.error('Please enter username and password')
		}
		else {

			// toast.info('New update is saved ...')
			var formData = new FormData()
			formData.append('username', username.value)
			formData.append('password', password.value)

			const url = `${process.env.REACT_APP_BACKEND_URL}/login`
			const response = await axios.post(url, formData)

			if (response.data.statusTxt !== 'ok') {
				toast.error('Login is unsuccessful ..')
				setUsername({...username, error: true})
				setPassword({...password, error: true})
			}
			else {

				localStorage.setItem('token', response.data.token)
				localStorage.setItem('username', username.value)
				localStorage.setItem('isLoggedIn', true)
				
				dispatch({
                    type: 'DO_LOGIN',
					username: username.value,
					token: response.data.token,
				})
				
				props.history.push('/todo')
				// toast.success('Welcome to TODOS App')
				
			}

		}

	}

	useEffect(() => { 
		document.title = 'Todos App - Login'
	}, [state])

	return (
		<div className="col-md-4 col-md-offset-4">
			<h1>Login</h1>
			<form className="form-horizontal login-form" method="POST" onSubmit={handleSubmit}>
				<div className="input-group">

					<span className="input-group-addon">
						<i className="glyphicon glyphicon-user"></i>
					</span>
					<input 
						type="text" 
						className={username.error ? 'form-control input-error' : 'form-control' }
						name="username" 
						placeholder="Username" 
						value={username.value ? username.value : ''}
						onChange={(e)=> setUsername({
							value: e.target.value,
							error: false
						})}
					/>

				</div>

				<div className="input-group">

					<span className="input-group-addon">
						<i className="glyphicon glyphicon-lock"></i>
					</span>
					<input 
						type="password" 
						className={password.error ? 'form-control input-error' : 'form-control' }
						name="password" 
						placeholder="Password" 
						value={password.value ? password.value : ''}
						onChange={(e)=> setPassword({
							value: e.target.value,
							error: false
						})}
					/>

				</div>
				<div className="form-group">
					<div className="col-sm-12 controls">
						<button type="submit" className="btn btn-primary pull-right">
							<i className="glyphicon glyphicon-log-in"></i> login
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login