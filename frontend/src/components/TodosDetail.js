import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Context } from '../redux/app'
import Capitalize from '../functions/Capitalize'

import Loader from './Loader'
import Empty from './Empty'
import TodosItem from './TodosItem'
import TodosHeader from './TodosHeader'

const Detail = (props) => {

	const [ todos, setTodos ] = useState({ list: [], isLoaded: false })
	const { state } = useContext(Context)
	const todoId = props.match.params.id

	const fetchData = async (id) => {

		const url = `${process.env.REACT_APP_BACKEND_URL}/todo/${id}`
		const options = { headers: { 'Authorization': state.token }}
		const response = await axios.post(url, {}, options)

		if (response.data.statusTxt === 'error') {
			toast.error(Capitalize(response.data.msg))
			props.history.push('/login')
		}
		else {

			var tmpArray = []
			tmpArray.push(response.data.result)

			setTodos({
				list: tmpArray,
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
			props.history.push('/todo')
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
			fetchData(id) 
			toast.success('Todo item marked as completed')
		}
	}

	useEffect(() => { 

		if (!state.isLoggedIn) { props.history.push('/login') }
		else {

			if (!todos.isLoaded) {
				fetchData(todoId)
			}

		}

	})

	if (!todos.isLoaded) return (<Loader />)
	else {

		return (
			<div className="col-md-4 col-md-offset-4">
				<h1>Todo List:</h1>

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
									link={false}
								/>
							)
						})}

						{todos.list.length <= 0 ? <Empty /> : <React.Fragment></React.Fragment>}

					</tbody>
				</table>
			</div>
		)
	
	}
}

export default Detail