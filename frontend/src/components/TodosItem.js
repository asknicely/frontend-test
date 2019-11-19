import React from 'react'
import { Link } from "react-router-dom"

const Item = (props) => {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.user}</td>
            <td>{!props.link ? props.description : <Link to={`/todo/${props.id}`}>{props.description}</Link>}</td>
            <td>{parseInt(props.completed) === 1 ? 'Completed' : ''}</td>
            <td nowrap="true">

                <button 
                    type="button" 
                    className="btn btn-xs btn-danger custom-button"
                    onClick={() => { props.handleDelete(props.id) }}
                >
                <span className="glyphicon glyphicon-remove glyphicon-white"></span>
                </button>


            </td>
        </tr>
    )
}

export default Item