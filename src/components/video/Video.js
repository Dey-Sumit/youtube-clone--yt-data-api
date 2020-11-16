import React from 'react'
import './video.scss'
import { AiFillEye } from 'react-icons/ai'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
const Video = ({ video }) => {
    const { id: { videoId }, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { high, standard, medium } } } = video

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
        <div className='video' onClick={handleVideoClick}>
            <img src={medium.url} alt="unsplash" class="video__thumbnail fluid" />

            {/* <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt="" className="video__thumbnail__image fluid" /> */}

            <p className="video__title">{title}</p>
            <div className="video__metadata">
                <span><AiFillEye /> 12k </span>
                <span>• 1 week ago</span>
            </div>
            <div className="video__channel">

                <a href="!">
                    <img src="http://unsplash.it/36/36?gravity=center" alt="" className="video__channel-icon" />
                </a>
                <p className="video__channel-name">{channelTitle}</p>
            </div>

        </div >
    )
}

export default Video
