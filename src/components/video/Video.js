import React from 'react'
import './video.scss'
import { AiFillEye } from 'react-icons/ai'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import numeral from 'numeral'

const Video = ({ video }) => {
    const { id, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { high, standard, medium } }, statistics: { viewCount, likeCount } } = video
    console.log(video);
    //TODO FIX id contains videoId,channelID,playlistId
    const history = useHistory()
    const handleVideoClick = () => {
        console.log(id);
        history.push(`/watch/${id}`)
    }
    const handleChannelClick = () => {

    }


    return (
        <div className='video' onClick={handleVideoClick}>
            <img src={medium.url} alt="unsplash" class="video__thumbnail fluid" />

            {/* <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt="" className="video__thumbnail__image fluid" /> */}

            <p className="video__title">{title}</p>
            <div className="video__metadata">
                <span><AiFillEye /> {numeral(viewCount).format('0.0a')} </span>
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
