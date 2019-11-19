import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loader'

const Homepage = (props) => {

	const [data, setData] = useState({
		content: '',
		isLoaded: false
	})

	const fetchData = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}`
		const response = await axios.get(url)
		if (response.data.status === 200) setData({
			content: response.data.contents,
			isLoaded: true
		})
	}

	useEffect(() => {
		document.title = `Todos App Homepage`
		if (!data.isLoaded) fetchData()
	}, [data])


	if (!data.isLoaded) return (<Loader />)
	else {
		return (
			<React.Fragment>
				<h1>README</h1>
				<pre className="well">{data.content}</pre>
			</React.Fragment>
		)
	}

}

export default Homepage