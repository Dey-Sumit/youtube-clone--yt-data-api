import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { Switch, Route, useHistory } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'

import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'

import './app.scss'

const App = () => {

    const history = useHistory()

    const { accessToken } = useSelector(state => state.auth)

    useEffect(() => {
        if (accessToken) {
            history.push('/')
        }
    }, [accessToken, history])


    return (
        <Switch>
            <Route path="/auth" exact>
                <LoginScreen />
            </Route>
            <Route path="/" exact>
                <div className="app__container">
                    <Sidebar />
                    <HomeScreen />
                </div>
            </Route>

        </Switch>


    )
}

export default App
