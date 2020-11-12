import React from 'react'
import './video.scss'
import { AiFillEye } from 'react-icons/ai'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
const Video = ({ video, horizontal = true }) => {
    // const { id: { videoId }, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { high, standard, medium } } } = video
    //TODO FIX id contains videoId,channelID,playlistId
    const history = useHistory()
    const handleVideoClick = () => {
        // console.log(videoId);
        // history.push(`/watch/${videoId}`)
    }
    const handleChannelClick = () => {

    }
    function truncate(str, n = 50) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <Row className={`video ${horizontal ? 'video-horizontal' : ''}`} onClick={handleVideoClick}>
            {/* <a href="!" class="video__thumbnail" data-duration="12:24"> */}
            {/* <img src={medium.url} alt="unsplash" class="video__thumbnail__image fluid" /> */}
            <Col xs={6} md={4}>
                <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt="" className="video__thumbnail__image fluid" />
            </Col>
            {/* <div class="video__thumbnail__image" /> */}
            {/* </a> */}
            <Col xs={6} md={8}>
                <div class="video__bottom">
                    <a href="!">
                        <img src="http://unsplash.it/36/36?gravity=center" alt="" class="video__channel-icon" />
                    </a>
                    <div class="video__details">
                        <p class="video__title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quaerat sunt iure non </p>
                        {/* <p class="video__title">{truncate(title)}</p>
                    <p class="video__channel-name">{channelTitle}</p>
                    <div class="video__metadata">
                        <span><AiFillEye /> 12k </span>

                        <span>• 1 week ago</span>
                    </div> */}
                    </div>
                </div>
            </Col>
        </Row >
    )
}

export default Video
