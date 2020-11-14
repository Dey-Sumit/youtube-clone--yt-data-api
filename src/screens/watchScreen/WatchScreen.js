import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getRelatedVideos } from '../../redux/actions/videos.action';

const WatchScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const relatedVideos = useSelector(state => state.videos.relatedVideos)
    const loading = useSelector(state => state.videos.loading)

    useEffect(() => {
        dispatch(getRelatedVideos())
    }, [dispatch, id])

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }
    return (
        <Container fluid>
            <Row>
                <Col lg={8}>
                    <YouTube videoId={id} opts={opts} onReady={_onReady} />
                </Col>
                <Col lg={4}>
                    {relatedVideos &&
                        relatedVideos.map(video =>
                            <VideoHorizontal video={video} key={video.etag} />
                        )
                    }


                </Col>
            </Row>

        </Container>
    )
}

export default WatchScreen
