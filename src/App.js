import React, { useEffect, useState } from 'react'
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
import Subscriptions from './screens/subscriptions/Subscriptions'
import ChannelScreen from './screens/channelScreen/ChannelScreen'
import LikedVideosScreen from './screens/likedVideos/LikedVideos'



const Layout = ({ children }) => {

    const [showSidebar, setShowSidebar] = useState(false)

    const toggleShowSidebar = () => {
        setShowSidebar(value => !value)
    }

    return (
        <Container fluid className="p-0">
            <Header toggleShowSidebar={toggleShowSidebar} />
            <div className="app__container">
                {<Sidebar showSidebar={showSidebar} />}
                <Container fluid>
                    {children}
                </Container>
            </div>
        </Container>
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
            <Route path="/feed/subscriptions" exact>
                <Layout>
                    <Subscriptions />
                </Layout>
            </Route>
            <Route path="/feed/likedVideos" exact>
                <Layout>
                    <LikedVideosScreen />
                </Layout>
            </Route>
            <Route path="/channel/:channelId" exact>
                <Layout>
                    <ChannelScreen />
                </Layout>
            </Route>

        </Switch>


    )
}

export default App
