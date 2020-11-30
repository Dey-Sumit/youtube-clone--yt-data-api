import React, { useEffect, useState } from 'react'
import './video.scss'
import { AiFillEye } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import numeral from 'numeral'
import moment from 'moment'
import request from '../../api'

const Video = ({ video, showStats = false, showChannel = true }) => {
    const { id, contentDetails: { duration, videoId }, snippet: { channelId, channelTitle, description, title, publishedAt,
        thumbnails: { high, standard, medium } }, statistics } = video
    // console.log(videoId);
    const _videoId = videoId || id

    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss")
    const [channelIcon, setChannelIcon] = useState(null)

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

    //TODO FIX id contains videoId,channelID,playlistId
    const history = useHistory()

    const handleVideoClick = () => {
        history.push(`/watch/${_videoId}`)
    }

    //TODO
    const handleChannelClick = (e) => {
        e.stopPropagation();
        history.push(`/channel/${channelId}`)
    }


    return (
        <div className='video' onClick={handleVideoClick}>
            <div className="video__thumbnail">
                <img src={medium.url} alt="unsplash" className="fluid" />
                {_duration !== '00:00' && <span className="video__duration">{_duration}</span>}
            </div>
            {/* <img src="https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png" alt="" className="video__thumbnail__image fluid" /> */}

            <p className="video__title">{title}</p>
            <div className="video__metadata">
                {statistics && <span><AiFillEye /> {numeral(statistics.viewCount).format('0.a')} •  </span>}
                <span>{moment(publishedAt).fromNow()}</span>
            </div>
            {
                showChannel && <div className="video__channel" >
                    <img src={channelIcon && channelIcon.url} alt="" className="video__channel__icon" onClick={handleChannelClick} />
                    <p className="video__channel__name mb-0">{channelTitle}</p>
                </div>
            }

        </div >
    )
}

export default Video
