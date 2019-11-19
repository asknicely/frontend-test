import React from 'react'

export const Context = React.createContext()

export const initial = {
    username: '',
    isLoggedIn: false,
    token: ''
}

export const reducer = (state, action) => {
    switch (action.type) {

        case 'DO_LOGIN':
            return { 
                ...state, 
                username: action.username,
                token: action.token,
                isLoggedIn: true
            }

        case 'DO_LOGOUT':
            return { 
                ...state, 
                username: '',
                token: '',
                isLoggedIn: false
            }            
        
        default:
            return {
                ...state,
            }
    }
}