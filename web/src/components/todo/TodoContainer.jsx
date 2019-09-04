import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'

import Modal from 'react-modal'
import TodoItem from './TodoItem'
import { fetchTodos, createTodo, deleteTodo, completeTodo } from './todoAction'

Modal.setAppElement('#root')

class TodoContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            todoIdToBeDeleted: null
        }
        this.newItemDescriptionInput = null
        this.addButton = null
    }

    componentDidMount () {
        const { dispatch } = this.props
        dispatch(fetchTodos())
    }

    NewItemBox () {
        const { dispatch } = this.props
        return (
            <div className='todo-container--new-item-box'>
                <input className='todo-container--new-item-box--description' 
                    ref={(node) => { this.newItemDescriptionInput = node }} 
                    spellCheck={false}
                    placeholder={'New Todo Description...'} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.addButton.click()
                        }
                    }} /> 
                <button className='todo-container--new-item-box--add-button' 
                    ref={( node ) => { this.addButton = node }}
                    onClick={() => {
                        const description = this.newItemDescriptionInput.value.trim()
                        if (description.length > 0) {
                            dispatch(createTodo(description)).then((response) => {
                                if (response && response.status === 201) {
                                    this.newItemDescriptionInput.value = ''
                                }
                            })
                        }
                    }}>{'Add'}</button>
            </div>
        )
    }

    DeleteModal () {
        const { todoIdToBeDeleted } = this.state
        const { dispatch } = this.props
        return todoIdToBeDeleted ? (
            <Modal overlayClassName='modal-overlay'
                className='todo-container--delete-modal centered'
                isOpen>
                <div className='todo-container--delete-modal--description'>{'Are you sure to delete the Todo?'}</div>
                <div className='todo-container--delete-modal--buttons'>
                    <button className='todo-container--delete-modal--button cancel-button' onClick={() => {
                        this.setState({ todoIdToBeDeleted: null })
                    }}>{'Never Mind'}</button>
                    <button className='todo-container--delete-modal--button delete-button' onClick={() => {
                        dispatch(deleteTodo(todoIdToBeDeleted)).then((response) => {
                            if (response && response.status === 200) {
                                this.setState({ todoIdToBeDeleted: null })
                            }
                        })
                    }}>{'Delete'}</button>
                </div>
            </Modal>
        ) : null
    }

    render () {
        const { dispatch, todoItems } = this.props
        return (
            <div className='todo-container'>
                <div className='todo-container--title'>{'Todo List'}</div>
                <table className='todo-container--items'>
                    <thead>
                        <tr>
                            <th>{'ID'}</th>
                            <th>{'User ID'}</th>
                            <th>{'Description'}</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(todoItems, (todoItem) => (
                            <TodoItem todoItem={todoItem} key={todoItem.id} 
                                onClickCompleteButton={() => {
                                    dispatch(completeTodo(todoItem.id))
                                }}
                                onClickDeleteButton={() => { 
                                    this.setState({ todoIdToBeDeleted: todoItem.id })
                                }} />)
                        )}
                    </tbody>
                </table>
                {this.NewItemBox()}
                {this.DeleteModal()}
            </div>
        )
    }
}

TodoContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    todoItems: PropTypes.object.isRequired
}

function mapStateToProps (state) {
    return {
        todoItems: state.todo.items
    }
}

export default connect(mapStateToProps)(TodoContainer)