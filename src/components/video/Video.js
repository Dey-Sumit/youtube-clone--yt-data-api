import React from 'react'
import './video.scss'
import { AiFillEye } from 'react-icons/ai'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import numeral from 'numeral'
import moment from 'moment'
import { useSelector } from 'react-redux'

const Video = ({ video }) => {
    const { id, contentDetails: { duration }, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { high, standard, medium } },
        statistics: { viewCount } } = video

    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss")

    // get the channel thumbnail
    const { channel: { snippet: channelSnippet, }, loading, success } = useSelector(state => state.channelDetails)


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
            <span className="video__duration">{_duration}</span>
            {/* <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt="" className="video__thumbnail__image fluid" /> */}

            <p className="video__title">{title}</p>
            <div className="video__metadata">
                <span><AiFillEye /> {numeral(viewCount).format('0.a')} </span>
                <span>• {moment(publishedAt).fromNow()}</span>
            </div>
            <div className="video__channel">

                <a href="!">
                    <img src={channelSnippet?.thumbnails?.default?.url} alt="" className="video__channel-icon" />
                </a>
                <p className="video__channel-name">{channelTitle}</p>
            </div>

        </div >
    )
}

export default Video
