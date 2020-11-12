import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { Switch, Route, useHistory } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'

import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/loginScreen/LoginScreen'

import './app.scss'
import WatchScreen from './screens/watchScreen/WatchScreen'
import SearchResultsScreen from './screens/searchResultsScreen/SearchResultsScreen'

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
                    {/* <HomeScreen /> */}
                    <SearchResultsScreen />
                </div>
            </Route>
            <Route path="/watch/:id">
                <div className="app__container">
                    <Sidebar />
                    <WatchScreen />
                </div>
            </Route>
            <Route path="/search/:search_query" exact>
                <div className="app__container">
                    <Sidebar />
                    <SearchResultsScreen />
                </div>
            </Route>

        </Switch>


    )
}

export default App
