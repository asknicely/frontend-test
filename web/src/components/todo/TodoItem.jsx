import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { FiCheck, FiTrash2 } from 'react-icons/fi'

class ToDoItem extends Component {
    render () {
        const { todoItem, onClickCompleteButton, onClickDeleteButton } = this.props
        const completed = todoItem.completed === '1'
        return (
            <tr className='todo-item' key={todoItem.id}>
                <td className='todo-item--id'>{todoItem.id}</td>
                <td className='todo-item--user-id'>{todoItem.user_id}</td>
                <td className='todo-item--description'>{todoItem.description}</td>
                <td className='todo-item--actions'>
                    <button className={`todo-item--complete-button ${completed ? 'completed' : 'not-complete'}`} disabled={completed}
                        onClick={() => { onClickCompleteButton() }}>
                        {completed && <FiCheck />}
                        {completed ? 'Completed' : 'Complete'}
                    </button>
                    <button className='todo-item--remove-button' onClick={() => { onClickDeleteButton() }}><FiTrash2 /></button>
                </td>
            </tr>
        )
    }
}

ToDoItem.propTypes = {
    todoItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        description: PropTypes.string,
        completed: PropTypes.oneOf(['0', '1'])
    }),
    onClickCompleteButton: PropTypes.func.isRequired,
    onClickDeleteButton: PropTypes.func.isRequired
}

ToDoItem.defaultProps = {
    onClickCompleteButton: () => {},
    onClickDeleteButton: () => {}
}

export default connect()(ToDoItem)