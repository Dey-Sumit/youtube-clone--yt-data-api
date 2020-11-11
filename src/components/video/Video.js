import React from 'react'
import './video.scss'
import { AiFillEye } from 'react-icons/ai'
import { Col } from 'react-bootstrap'
const Video = ({ video }) => {
    console.log("here", video);
    const { snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { high } } } = video
    return (
        <Col md={4} lg={3} className="p-2 video">
            {/* <a href="!" class="video__thumbnail" data-duration="12:24"> */}
            <img src={high.url} alt="unsplash" class="video__thumbnail__image" />
            {/* </a> */}
            <div class="video__bottom">
                <a href="!">
                    <img src="http://unsplash.it/36/36?gravity=center" alt="" class="video__channel-icon" />
                </a>
                <div class="video__details">
                    <p class="video__title">{title.trim(0, 10)}</p>
                    <p class="video__channel-name">{channelTitle}</p>
                    <div class="video__metadata">
                        <span><AiFillEye /> 12k </span>

                        <span>• 1 week ago</span>
                    </div>
                </div>
            </div>
        </Col >
    )
}

export default Video
