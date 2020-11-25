import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
// import './homeScreen.scss'

import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getLikedVideos } from '../../redux/actions/videos.action'
import Video from '../../components/video/Video'
import InfiniteScroll from 'react-infinite-scroll-component'
const LikedVideosScreen = () => {

    const dispatch = useDispatch()

    const { accessToken } = useSelector(state => state.auth)
    const videos = useSelector(state => state.likedVideos.videos)

    const history = useHistory()
    const [page, setPage] = useState(1)

    useEffect(() => {

        // handle private route
        if (!accessToken) {
            history.push('/auth')
        }
        else {
            dispatch(getLikedVideos())
        }
    }, [history, page, dispatch, accessToken])

    return (

        <Container className="main">
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

export default LikedVideosScreen
