import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const WatchScreen = () => {

    const { id } = useParams()

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
        event.target.pauseVideo();
    }
    return (
        <Container fluid>
            <Row>
                <Col lg={8}>
                    <YouTube videoId={id} opts={opts} onReady={_onReady} />
                </Col>
                <Col lg={4}></Col>
            </Row>

        </Container>
    )
}

export default WatchScreen
