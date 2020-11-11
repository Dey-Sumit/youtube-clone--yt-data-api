import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './homeScreen.scss'

import Header from '../../components/header/Header'
import { Container, Row } from 'react-bootstrap'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchVideos } from '../../redux/actions/videos.action'
import Video from '../../components/video/Video'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const { accessToken } = useSelector(state => state.auth)
    const videos = useSelector(state => state.videos.searchedResults)

    console.log(videos);

    const history = useHistory()

    useEffect(() => {

        if (!accessToken) {
            history.push('/auth')
        }
        else {
            dispatch(fetchVideos())
        }
    }, [history, dispatch, accessToken])

    return (

        <Container className="main">
            <Header />
            <CategoriesBar />

            <h4>Recommended Videos</h4>
            <Row className="mt-4">

                {
                    videos && videos.map(video =>
                        <Video key={video.etag} video={video} />
                    )
                }


            </Row>

            <h4>Recommended Videos</h4>
        </Container>

    )
}

export default HomeScreen
