import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AuthForm from '../components/auth/AuthForm'

class LoginPage extends Component {

    constructor (props) {
        super(props)
        const { auth, history } = this.props
        if (!_.isEmpty(auth.user)) {
            history.push('/todo')
        }
    }
    
    render () {
        return (
            <div className='login-page'>
                <div className='login-page--main centered'>
                    <AuthForm />
                </div>
            </div>
        )
    }
}

LoginPage.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

function mapStateToProps (state) {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(LoginPage)