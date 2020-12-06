import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Video from '../../components/video/Video'
import { getAllVideosOfChannel, getChannelDetails } from '../../redux/actions/channel.action'
import numeral from 'numeral'

import './channelScreen.scss'
import SkeletonCard from '../../components/skeleton/SkeletonCard'

const ChannelScreen = () => {

    const { channelId } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
        dispatch(getAllVideosOfChannel(channelId))
    }, [dispatch, channelId])



    const { snippet, statistics } = useSelector(state => state.channelDetails.channel)
    const { videos, loading } = useSelector(state => state.channelVideos)

    //TODO change to helmet
    useEffect(() => {
        document.title = snippet?.title
    }, [snippet])


    // const history = useHistory()
    // const [page, setPage] = useState(1)

    return (
        <>

            <div className="channelHeader">
                <div className="channelHeader__left">
                    <img src={snippet?.thumbnails?.default?.url} alt="" />
                    <div className="channelHeader__left__details">
                        <h3>{snippet?.title}</h3>
                        <span>{numeral(statistics?.subscriberCount).format('0.a')} subscribers</span>
                    </div>
                </div>
                <div className="channelHeader__right">
                    <button>Subscribe</button>
                </div>
            </div>

            <Container>
                <Row className="mt-2">
                    {
                        !loading ? videos.map(video =>
                            <Col md={4} lg={3} key={video.etag} >
                                <Video video={video} showChannel={false} />
                            </Col>
                        ) :
                            <SkeletonCard width="260px" height="230px" style={{ margin: '0.5rem' }} count={15} />

                    }
                </Row>
            </Container>
        </>
    )
}

export default ChannelScreen
