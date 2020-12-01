import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
// import './homeScreen.scss'

import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getLikedVideos } from '../../redux/actions/videos.action'
import Video from '../../components/video/Video'
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeletonCard from '../../components/skeleton/SkeletonCard'
const LikedVideosScreen = () => {

    const dispatch = useDispatch()

    const { accessToken } = useSelector(state => state.auth)
    const { videos, loading } = useSelector(state => state.likedVideos)

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
        <Container>
            <Row className="mt-4">
                {
                    !loading ? videos?.map(video =>
                        <Col md={4} lg={3}>
                            <Video key={video.etag} video={video} />
                        </Col>
                    )
                        :
                        [...Array(10)].map(
                            (d, i) => <Col md={4} lg={3} key={i}>
                                <SkeletonCard width="100%" height="230px" />
                            </Col>
                        )
                }
            </Row>
        </Container>
    )

}

export default LikedVideosScreen
