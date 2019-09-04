import { API_BASE_URL } from '../../configs/config'
import { secureFetch } from '../../util/util'

export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export function authLogin (username, password) {
    return (dispatch) => {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        return dispatch(secureFetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            body: formData
        })).then((response) => {
            const getBody = response.json()
            getBody.then((body) => {
                if (response.status === 200) {
                    dispatch({
                        type: AUTH_LOGIN_SUCCESS,
                        user: body
                    })
                }
            })
            return getBody
        })
    }
}

export function authLogout () {
    return (dispatch) => {
        return dispatch(secureFetch(`${API_BASE_URL}/logout`, {
            method: 'POST'
        })).then((response) => {
            if (response.status === 204) {
                dispatch({
                    type: AUTH_LOGOUT
                })
            }
        })
    }
}