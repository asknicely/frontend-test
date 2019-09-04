import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { FiUser } from 'react-icons/fi'
import { authLogout } from '../components/auth/authAction'

class PageLayout extends Component {

    constructor (props) {
        super(props)
        this.menu = [{
            name: 'Todo List',
            path: '/todo'
        }]
    }

    Header () {
        const { dispatch, user, history } = this.props
        return (
            <div className='page-layout--header'>
                <div className='page-layout--header--body horizontal-centered clearfix'>
                    <h1 className='page-layout--header--title' onClick={() => { history.push('/') }}>{'AskNicely'}</h1>
                    <div className='page-layout--menu'>
                        {this.menu.map((menuItem, index) => {
                            return (
                                <button className='page-layout--menu--item' key={index}
                                    onClick={() => { history.push(menuItem.path) }}>{menuItem.name}</button>
                            )
                        })}
                    </div>
                    <div className='page-layout--user'>
                        {user ? 
                        <Fragment>
                            <FiUser className='vertical-centered'/>
                            <div className='page-layout--user--name'>{user.username}</div>
                            <button className='page-layout--user--logout-button' onClick={() => { dispatch(authLogout()) }}>{'Log Out'}</button>
                        </Fragment>
                        : <button className='page-layout--user--login-button'>{'Log In'}</button>}
                    </div>
                </div>
            </div>
        )
    }

    render () {
        const { children } = this.props
        return (
            <div className='page-layout'>
                {this.Header()}
                <div className='page-layout--main'>{children}</div>
            </div>
        )
    }
}

PageLayout.propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    user: PropTypes.object,
    history: PropTypes.object.isRequired
}

function mapStateToProps (state) {
    return {
        user: state.auth.user
    }
}

export default withRouter(connect(mapStateToProps)(PageLayout)) 