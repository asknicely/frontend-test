import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import { ADD_TODO_ITEMS, UPDATE_TODO_ITEM, REMOVE_TODO_ITEM } from './todoAction'
import { AUTH_LOGOUT } from '../auth/authAction'

const initialState = {
    items: {}
}

export function todoReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_ITEMS:
            return dotProp.merge(state, 'items', _.keyBy(action.todos, 'id'))

        case UPDATE_TODO_ITEM:
            return _.has(state.items, action.todoId)
                ? dotProp.merge(state, `items.${action.todoId}`, action.params)
                : dotProp.set(state, `items.${action.todoId}`, action.params)

        case REMOVE_TODO_ITEM:
            return dotProp.delete(state, `items.${action.todoId}`)

        case AUTH_LOGOUT: 
            return initialState;

        default: 
            return state
    }
}