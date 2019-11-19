import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Context } from '../redux/app'
import Capitalize from '../functions/Capitalize'

import Loader from './Loader'
import Empty from './Empty'
import TodosItem from './TodosItem'
import TodosForm from './TodosForm'
import TodosHeader from './TodosHeader'

const Todos = (props) => {

	const [ todos, setTodos ] = useState({ list: [], isLoaded: false })
	const [ description, setDescription ] = useState('')
	const { state } = useContext(Context)
	// const todoId = props.match.params.id

	const fetchData = async (id) => {

		const url = `${process.env.REACT_APP_BACKEND_URL}/todo`
		const options = { headers: { 'Authorization': state.token }}
		const response = await axios.post(url, {}, options)

		if (response.data.statusTxt === 'error') {
			toast.error(Capitalize(response.data.msg))
			props.history.push('/login')
		}
		else {

			setTodos({
				list: response.data.result,
				isLoaded: true
			})

		}
	}

	const handleDelete = async (id) => {

		var formData = new FormData()
		formData.append('id', id)

		const url = `${process.env.REACT_APP_BACKEND_URL}/todo/delete`
		const options = { headers: { 'Authorization': state.token }}
		const response = await axios.post(url, formData, options)

		if (response.data.statusTxt === 'error') {
			toast.error(Capitalize(response.data.msg))
			props.history.push('/login')
		}
		else { 
			fetchData() 
			toast.success('Todo item deleted')
		}
	}

	const handleComplete = async (id) => {

		var formData = new FormData()
		formData.append('id', id)

		const url = `${process.env.REACT_APP_BACKEND_URL}/todo/complete`
		const options = { headers: { 'Authorization': state.token }}
		const response = await axios.post(url, formData, options)

		if (response.data.statusTxt === 'error') {
			toast.error(Capitalize(response.data.msg))
			props.history.push('/login')
		}
		else { 
			fetchData() 
			toast.success('Todo item marked as completed')
		}
	}
	
	const handleSubmit = async (e) => {

		e.preventDefault()
		if (description) {

			var formData = new FormData()
			formData.append('description', description)

			const url = `${process.env.REACT_APP_BACKEND_URL}/todo/add`
			const options = { headers: { 'Authorization': state.token }}
			const response = await axios.post(url, formData, options)

			if (response.data.statusTxt === 'error') {
				toast.error(Capitalize(response.data.msg))
				props.history.push('/login')
			}
			else { 

				setDescription('')
				fetchData() 
				toast.success('Todo item added')

			}		
		}
		else {
			toast.error('Please enter description to add a TODO')
		}
	}

	useEffect(() => { 

		if (!state.isLoggedIn) { props.history.push('/login') }
		else {

			if (!todos.isLoaded) {
				fetchData()
			}

		}

	})

	if (!todos.isLoaded) return (<Loader />)
	else {

		return (
			<div className="col-md-4 col-md-offset-4">
				<h1>Todo List:</h1>

				<form method="post" onSubmit={handleSubmit}>
				<table className="table table-striped">
					<tbody>
						
						<TodosHeader />

						{todos.list.map((todo) => {
							return (
								<TodosItem 
									key={todo.id}
									id={todo.id}
									user={todo.user_id}
									description={todo.description}
									completed={todo.completed}
									handleDelete={handleDelete}
									handleComplete={handleComplete}
									link={true}
								/>
							)
						})}

						{todos.list.length <= 0 ? <Empty /> : <React.Fragment></React.Fragment>}
		
						<TodosForm 
							description={description}
							setDescription={setDescription}
							handleSubmit={handleSubmit}
						/>

					</tbody>
				</table>
				</form>
			</div>
		)
	
	}
}

export default Todos