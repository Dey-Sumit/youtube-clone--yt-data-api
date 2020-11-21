import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'
import { getSubscriptionsVideos } from '../../redux/actions/videos.action'
import './subscriptions.scss'

const Subscriptions = () => {

    const dispatch = useDispatch()
    const subscriptionsVideos = useSelector(state => state.videos.subscriptionVideos)

    useEffect(() => {
        dispatch(getSubscriptionsVideos())
    }, [dispatch])

    return (
        <Container fluid>
            {
                subscriptionsVideos?.length > 0 ?
                    subscriptionsVideos.map(video => <VideoHorizontal video={video} key={video.etag} />)
                    : <h6>Loading...</h6>
            }
        </Container>
    )
}

export default Subscriptions
