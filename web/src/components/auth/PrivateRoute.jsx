import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import _ from 'lodash'

class PrivateRoute extends Component {
    render () {
        const {component: Component, isLoggedIn, ...rest} = this.props
        return (
            <Route
                {...rest}
                render={props => { return isLoggedIn ? <Component {...props} /> : <Redirect to='/login' /> }} />
        )
    }
}

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
    return {
        isLoggedIn: _.has(state, 'auth.user.id') && _.isString(state.auth.user.id)
    }
}

export default connect(mapStateToProps)(PrivateRoute)