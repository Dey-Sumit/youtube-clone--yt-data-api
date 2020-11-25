import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'


import { getChannelDetails } from '../../redux/actions/channel.action'
import './videoHorizontal.scss'


const VideoHorizontal = ({ video }) => {

    const { id, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { medium } } } = video

    //TODO FIX id contains videoId,channelID,playlistId

    const thumbnail = id.kind === "youtube#channel" ? 'videoHorizon__thumbnail-channel'
        : id.kind === "youtube#video" ? 'videoHorizon__thumbnail-video' : 'videoHorizon__thumbnail-playlist'

    const history = useHistory()

    // const handleVideoClick = () => {
    //     // history.push(`/watch/${videoId}`)
    // }
    const dispatch = useDispatch()

    const { channel: { snippet: channelSnippet, }, loading, success } = useSelector(state => state.channelDetails)

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
    }, [channelId, dispatch])


    const handleClick = () => {
        if (id.kind === "youtube#channel") {
            history.push(`/channel/${id.channelId}`)
        }
        // for video
        //TODO handle playlist later
        else {
            history.push(`/watch/${id.videoId}`)
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

                    {/* <span><AiFillEye /> {numeral(viewCount).format('0.0a')} views • </span> */}
                    <span>{moment(publishedAt).fromNow()}</span>
                </div>
                <div className="videoHorizon__channel">

                    <a href="!">
                        <img src={channelSnippet?.thumbnails?.default?.url} alt="" className="videoHorizon__channel-icon" />
                    </a>
                    <p className="videoHorizon__channel-name">{channelTitle}</p>
                </div>
                <p className="videoHorizon__desc">{description} </p>
            </Col>

        </Row >

    )
}

export default VideoHorizontal
