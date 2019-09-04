import _ from 'lodash'
import dotProp from 'dot-prop-immutable'
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './authAction'

const initialState = {
    user: !_.isNil(localStorage.frontEndTestUser) ? JSON.parse(localStorage.frontEndTestUser) : null
}

export function authReducer (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            localStorage.frontEndTestUser = JSON.stringify(action.user)
            return dotProp.set(state, 'user', action.user)

        case AUTH_LOGOUT:
            localStorage.removeItem('frontEndTestUser')
            return dotProp.set(state, 'user', null)
            
        default:
            return state
    }
}