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
import Header from './components/header/Header'



const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="app__container">
                <Sidebar />
                {children}
            </div>
        </>
    )

}



const App = () => {

    const history = useHistory()

    const { accessToken } = useSelector(state => state.auth)

    useEffect(() => {
        if (!accessToken) {
            history.push('/auth')
        }
    }, [accessToken, history])


    return (
        <Switch>
            <Route path="/auth" exact>
                <LoginScreen />
            </Route>
            <Route path="/" exact>
                <Layout>
                    <HomeScreen />
                </Layout>
            </Route>
            <Route path="/watch/:id" exact>
                <Layout>
                    <WatchScreen />
                </Layout>
            </Route>
            <Route path="/search/:search_query" exact>
                <Layout>
                    <SearchResultsScreen />
                </Layout>
            </Route>

        </Switch>


    )
}

export default App
