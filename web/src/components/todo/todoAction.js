import _ from 'lodash'

import { secureFetch } from '../../util/util'
import { API_BASE_URL} from '../../configs/config'

export const ADD_TODO_ITEMS = 'ADD_TODO_ITEMS'
export const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM'
export const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM'

export function fetchTodos () {
    return (dispatch) => {
        return dispatch(secureFetch(`${API_BASE_URL}/todo`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }))
        .then((response) => {
            if (response.status === 200) {
                response.json().then((body) => {
                    if (_.isArray(body) && !_.isEmpty(body)) {
                        dispatch({
                            type: ADD_TODO_ITEMS,
                            todos: body
                        })
                    }
                })
            }
        })
    }
} 

export function createTodo (description) {
    return (dispatch) => {
        const formData = new FormData()
        formData.append('description', description)
        return dispatch(secureFetch(`${API_BASE_URL}/todo/add`, {
            method: 'POST',
            body: formData
        })).then((response) => {
            if (response.status === 201) {
                response.json().then((body) => {
                    if (!_.isEmpty(body.todo)) {
                        dispatch({
                            type: ADD_TODO_ITEMS,
                            todos: [body.todo]
                        })   
                    }
                })
            }
            return response
        })
    }
}

export function completeTodo (id) {
    return (dispatch) => {
        return dispatch(secureFetch(`${API_BASE_URL}/todo/complete/${id}`, {
            method: 'PUT'
        })).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_TODO_ITEM,
                    todoId: id,
                    params: {
                        completed: '1'
                    }
                })
            }
        })
    }
}

export function deleteTodo (id) {
    return (dispatch) => {
        return dispatch(secureFetch(`${API_BASE_URL}/todo/delete/${id}`, {
            method: 'DELETE'
        })).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: REMOVE_TODO_ITEM,
                    todoId: id
                })
            }
            return response
        })
    }
}