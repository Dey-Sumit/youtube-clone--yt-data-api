import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import './videoHorizontal.scss'


const VideoHorizontal = ({ video }) => {

    const { id: { videoId }, snippet: { resourceId, channelId, channelTitle, description, title, publishedAt, thumbnails: { medium } } } = video
    //TODO FIX id contains videoId,channelID,playlistId
    console.log(resourceId.kind);
    const thumbnail = resourceId.kind === "youtube#channel" ? 'thumbnail-channel'
        : resourceId.kind === "youtube#video" ? 'thumbnail-video' : 'thumbnail-playlist'
    const history = useHistory()

    // const handleVideoClick = () => {
    //     // history.push(`/watch/${videoId}`)
    // }

    const handleClick = () => {
        if (resourceId.kind === "youtube#channel") {
            history.push(`/channel/${resourceId.channelId}`)
        }
        // for video
        //TODO handle playlist later
        else {
            history.push(`/watch/${resourceId.videoId}`)

        }
    }

    return (
        <Row className="p-2 videoHorizon" onClick={handleClick}>
            <Col xs={6} md={4} className="videoHorizon__left">
                <img src={medium.url}
                    alt="" className={`videoHorizon__thumbnail fluid ${thumbnail}`} />
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
