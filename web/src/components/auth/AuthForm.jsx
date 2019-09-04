import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import _ from 'lodash'
import { authLogin } from './authAction'

class AuthForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            message: null,
            isLoggingIn: false
        }

        this.usernameInput = null
        this.passwordInput = null
        this.loginButton = null
    }

    _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    handleClickLoginButton (e) {
        e.preventDefault()
        const {dispatch, history} = this.props
        const username = this.usernameInput.value.trim()
        const password = this.passwordInput.value.trim()
        if (_.isEmpty(username)) {
            this.setState({ message: 'Please enter your username' })
        } else if (_.isEmpty(password)) {
            this.setState({ message: 'You forgot to enter your password' })
        } else {
            this.setState({ 
                message: null,
                isLoggingIn: true
            })
            dispatch(authLogin(username, password)).then((body) => {
                if (body) {
                    if (body.message) {
                        this.setState({
                            message: body.message,
                            isLoggingIn: false
                        })
                    } else if (body.id && body.username) {
                        history.push('/todo')
                    }
                }
            })
        }
    }
    
    renderFormInput ({className, label, autoFocus, inputType, onMount}) {
        const { message } = this.state
        return (
            <div className={'auth-form--input-block' + (className ? ` ${className}` : '')}>
                <label className='auth-form--input-label'>{label}</label>
                <input className='auth-form--input'
                    ref={(node) => { if (_.isFunction(onMount)){ onMount(node) } }}
                    autoFocus={autoFocus} 
                    type={inputType} 
                    spellCheck={false} 
                    autoComplete={''}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            this.loginButton.click()
                        } else if (message) {
                            this.setState({ message: null })
                        }
                    }} />
            </div>
        )
    }

    render () {
        const { message, isLoggingIn } = this.state
        return (
            <div className='auth-form clearfix'>
                <div className='auth-form--title'>{'AskNicely Front End Test'}</div>
                <div className='auth-form--caption'>{'Created By Brett'}</div>
                <form className='auth-form--main'>
                    {this.renderFormInput({
                        label: 'Username',
                        autoFocus: true,
                        inputType: 'text',
                        onMount: (node) => { this.usernameInput = node } 
                    })}
                    {this.renderFormInput({
                        label: 'Password',
                        autoFocus: false,
                        inputType: 'password',
                        onMount: (node) => { this.passwordInput = node }
                    })}
                    {message && <div className='auth-form--message'>{message}</div>}
                    <button className='auth-form--login-button' ref={(node) => { this.loginButton = node }}
                        disabled={isLoggingIn}
                        onClick={(e) => { this.handleClickLoginButton(e) }}>{isLoggingIn ? 'LOGGING IN ...' : 'LOG IN'}</button>
                </form>
            </div>
        )
    }
}

AuthForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}


export default withRouter(connect()(AuthForm))