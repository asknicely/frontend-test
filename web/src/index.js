import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { authReducer } from './components/auth/authReducer'
import { todoReducer } from './components/todo/todoReducer'

import PrivateRoute from './components/auth/PrivateRoute'
import PageLayout from './layouts/PageLayout'
import NoMatchPage from './pages/NoMatchPage'
import TodoListPage from './pages/TodoListPage'
import LoginPage from './pages/LoginPage'

import './styles/global.scss'
import './styles/pageLayout.scss'
import './styles/loginPage.scss'
import './styles/todoListPage.scss'
import './components/auth/auth.scss'
import './components/todo/todo.scss'

import * as serviceWorker from './serviceWorker'

const middlewares = [thunk, promise]
if (process.env.REACT_APP_REDUX_LOGGER_ENABLED === 'TRUE') {
   middlewares.push(createLogger())
}

const store = createStore(combineReducers({
    auth: authReducer,
    todo: todoReducer
}), applyMiddleware(...middlewares))

const PrivateLayoutRoute = ({component: Component, ...rest}) => { // eslint-disable-line
    const LayoutComponent = () => { // eslint-disable-line
        return (
            <PageLayout><Component /></PageLayout>
        )
    }
    return (
        <PrivateRoute {...rest} component={LayoutComponent} />
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/login' component={LoginPage} />
                <PrivateLayoutRoute 
                    path='/todo' 
                    component={TodoListPage} />
                <Route path='/*' component={NoMatchPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'),
    () => {
        document.getElementById('page-loading-animation').remove()
    }
)

serviceWorker.unregister()
