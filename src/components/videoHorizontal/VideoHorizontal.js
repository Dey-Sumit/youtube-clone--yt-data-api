import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { AiFillEye } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'


import { getChannelDetails } from '../../redux/actions/channel.action'
import './videoHorizontal.scss'
import request from '../../api'


const VideoHorizontal = ({ video, showChannel = true, showDescription = true }) => {

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
    const [channelIcon, setChannelIcon] = useState(null)

    const [duration, setDuration] = useState(null)
    const [views, setViews] = useState(null)

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

    useEffect(() => {
        // get the channel thumbnail
        const get_channel_thumbnail = async () => {

            const { data: { items } } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                }
            })
            setChannelIcon(items[0].snippet.thumbnails.default);
        }
        if (showChannel)
            get_channel_thumbnail()
    }, [showChannel, channelId])

    useEffect(() => {
        const get_video_details = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: id.videoId
                }
            })
            setViews(items[0].statistics.viewCount)
            setDuration(items[0].contentDetails.duration)
        }
        get_video_details()
    }, [id])


    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss")

    return (
        <Row className="p-2 videoHorizon" onClick={handleClick}>

            <Col xs={6} md={showDescription ? 4 : 6} className="videoHorizon__left">
                <img src={medium.url}
                    alt="" className={`videoHorizon__thumbnail fluid ${thumbnail}`} />
                {_duration !== '00:00' && <span className="videoHorizon__duration">{_duration}</span>}
            </Col>

            <Col xs={6} md={showDescription ? 8 : 6} className="videoHorizon__right">

                <p className="videoHorizon__title">{title}</p>
                <div className="videoHorizon__metadata">
                    {views && <span><AiFillEye /> {numeral(views).format('0.a')} •  </span>}
                    <span>{moment(publishedAt).fromNow()}</span>
                </div>
                {id.kind !== "youtube#channel" &&
                    <div className="videoHorizon__channel">
                        <img src={channelIcon && channelIcon.url} alt="" className="videoHorizon__channel-icon" />
                        <p className="videoHorizon__channel-name">{channelTitle}</p>
                    </div>
                }
                {showDescription && <p className="videoHorizon__desc">{description} </p>}
            </Col>

        </Row >

    )
}

export default VideoHorizontal
