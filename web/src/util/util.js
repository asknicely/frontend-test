import fetch from 'isomorphic-fetch'
import { AUTH_LOGOUT } from '../components/auth/authAction'

export const secureFetch = (url, options={}) => {
    return (dispatch) => {
        options.credentials = 'include'
        options.headers = Object.assign({}, options.header || {} , {
            'Accept': 'application/json'
        })
        const request = fetch(url, options)
        request.then((response) => {
            if (response.status === 401) {
                dispatch({
                    type: AUTH_LOGOUT
                })
            }
        }).catch(() => {
            dispatch({
                type: AUTH_LOGOUT
            })
        })
        return request
    }
}