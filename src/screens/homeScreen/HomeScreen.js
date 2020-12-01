import React, { useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import Video from '../../components/video/Video'

import { fetchPopularVideos } from '../../redux/actions/videos.action'
import './homeScreen.scss'
import SkeletonCard from '../../components/skeleton/SkeletonCard'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const { accessToken } = useSelector(state => state.auth)
    const videos = useSelector(state => state.videos.videos)

    const history = useHistory()
    const [page, setPage] = useState(1)

    useEffect(() => {

        // TODO create private route

        if (!accessToken) {
            history.push('/auth')
        }
        else {
            dispatch(fetchPopularVideos())
        }

    }, [history, page, dispatch, accessToken])

    return (

        <Container className="main">
            {
                videos?.length > 0 ?
                    (<InfiniteScroll
                        dataLength={videos.length}
                        next={() => setPage(page => page + 1)}
                        hasMore={true}
                        loader={<div className="spinner-border text-danger d-block mx-auto" />}
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
                                        <Col md={4} lg={3} key={video.etag} >
                                            <Video video={video} />
                                        </Col>
                                    )
                                }
                            </Row>
                        </Container>
                    </InfiniteScroll>
                    ) :
                    <SkeletonCard width="250px" height="230px" count={15} style={{ margin: '0.5rem' }} />
            }

        </Container>

    )
}

export default HomeScreen
