import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import './videoHorizontal.scss'


const VideoHorizontal = ({ video }) => {
    const { id: { videoId }, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { medium } } } = video
    //TODO FIX id contains videoId,channelID,playlistId
    const history = useHistory()
    const handleVideoClick = () => {
        history.push(`/watch/${videoId}`)
    }
    const handleChannelClick = () => { }

    return (
        <Row className="p-2 videoHorizon" onClick={handleVideoClick}>
            <Col xs={6} md={4}>
                <img src={medium.url}
                    alt="" className="videoHorizon__thumbnail fluid" />
            </Col>
            <Col xs={6} md={8} className="videoHorizon__details">

                <p className="videoHorizon__title">{title}</p>
                <div className="videoHorizon__metadata">
                    <span><AiFillEye /> 12k </span>
                    <span>• 1 week ago</span>
                </div>
                <div className="videoHorizon__channel">

                    <a href="!">
                        <img src="http://unsplash.it/36/36?gravity=center" alt="" className="videoHorizon__channel-icon" />
                    </a>
                    <p className="videoHorizon__channel-name">{channelTitle}</p>
                </div>
                <p className="videoHorizon__desc">{description} </p>
            </Col>
        </Row >

    )
}

export default VideoHorizontal
