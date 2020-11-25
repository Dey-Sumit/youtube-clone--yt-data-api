import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './homeScreen.scss'

import Header from '../../components/header/Header'
import { Col, Container, Row } from 'react-bootstrap'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchPopularVideos, fetchVideos } from '../../redux/actions/videos.action'
import Video from '../../components/video/Video'
import InfiniteScroll from 'react-infinite-scroll-component'
const HomeScreen = () => {

    const dispatch = useDispatch()

    const { accessToken } = useSelector(state => state.auth)
    const videos = useSelector(state => state.videos.popularVideos)

    const history = useHistory()
    const [page, setPage] = useState(1)

    useEffect(() => {

        // handle private route
        if (!accessToken) {
            history.push('/auth')
        }
        else {
            dispatch(fetchPopularVideos())
        }
    }, [history, page, dispatch, accessToken])

    return (

        <Container className="main">
            <CategoriesBar />
            {
                videos.length > 0 &&
                (<InfiniteScroll
                    dataLength={videos.length}
                    next={() => setPage(page => page + 1)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <Container>
                        <Row className="mt-4">
                            {
                                videos.map(video =>
                                    <Col md={4} lg={3}>
                                        <Video key={video.etag} video={video} />
                                    </Col>
                                )
                            }
                        </Row>
                    </Container>
                </InfiniteScroll>
                )
            }



        </Container>

    )
}

export default HomeScreen
