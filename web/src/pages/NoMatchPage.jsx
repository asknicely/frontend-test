import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class NoMatchPage extends Component {
    constructor (props) {
        super(props)
        this.props.history.push('/todo')
    }

    render () {
        return <div />
    }
}

NoMatchPage.propTypes = {
    history: PropTypes.object.isRequired
}