import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SkeletonCard from '../../components/skeleton/SkeletonCard'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'
import { getSubscriptionsVideos } from '../../redux/actions/videos.action'
import './subscriptions.scss'

const Subscriptions = () => {

    const dispatch = useDispatch()
    const { loading, videos } = useSelector(state => state.subscriptionVideos)

    useEffect(() => {
        dispatch(getSubscriptionsVideos())
    }, [dispatch])

    return (
        <Container fluid>
            {
                !loading ?
                    videos.map(video => <VideoHorizontal video={video} key={video.etag} channelScreen />) :
                    <SkeletonCard width="100%" height="200px" count="15" />

            }
        </Container>
    )
}

export default Subscriptions
