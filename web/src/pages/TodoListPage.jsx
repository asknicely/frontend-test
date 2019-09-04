import React, { Component } from 'react'
import TodoContainer from '../components/todo/TodoContainer'

export default class TodoListPage extends Component {
    render () {
        return (
            <div className='todo-list-page'>
                <div className='todo-list-page--main horizontal-centered'>
                    <TodoContainer />
                </div>
            </div>
        )
    }
}