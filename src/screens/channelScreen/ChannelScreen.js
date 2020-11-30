import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Video from '../../components/video/Video'
import { getAllVideosOfChannel, getChannelDetails } from '../../redux/actions/channel.action'
import numeral from 'numeral'

import './channelScreen.scss'

const ChannelScreen = () => {

    const { channelId } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
        dispatch(getAllVideosOfChannel(channelId))
    }, [dispatch, channelId])

    const { channel: { snippet, statistics }, videos } = useSelector(state => state.channelDetails)

    useEffect(() => {
        document.title = snippet?.title
    }, [snippet])


    // const history = useHistory()
    const [page, setPage] = useState(1)

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

            <Container className="main">

                {
                    videos?.length > 0 &&
                    <InfiniteScroll
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
                                            <Video key={video.etag} video={video} showChannel={false} />
                                        </Col>
                                    )
                                }
                            </Row>
                        </Container>
                    </InfiniteScroll>
                }

            </Container>


        </>
    )
}

export default ChannelScreen
