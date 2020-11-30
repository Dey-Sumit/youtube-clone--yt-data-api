import React, { useEffect } from 'react'

import numeral from 'numeral'
import moment from 'moment'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text';

import './videoMetaData.scss'
import { useDispatch, useSelector } from 'react-redux'

import { getChannelDetails } from '../../redux/actions/channel.action'
import { rateVideo } from '../../redux/actions/videos.action';
import { checkSubscriptionStatus } from '../../redux/actions/channel.action';

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    // console.log(snippet);
    const { channelId, channelTitle, description, title, publishedAt } = snippet
    const { commentCount, dislikeCount, likeCount, viewCount } = statistics

    const dispatch = useDispatch()
    const { channel: { snippet: channelSnippet, statistics: channelStatistics }, loading, success, subscriptionStatus } = useSelector(state => state.channelDetails)
    useEffect(() => {
        dispatch(getChannelDetails(channelId))

    }, [channelId, dispatch])

    useEffect(() => {
        dispatch(checkSubscriptionStatus(channelId))
    }, [channelId, dispatch])

    const handleLikeVideo = () => {
        dispatch(rateVideo(videoId, "like"))
    }

    const handleDislikeVideo = () => {
        dispatch(rateVideo(videoId, "dislike"))
    }

    return (
        <div className="videoMetaData">
            <div className="videoMetaData__top py-2">
                <h5>{title}</h5>
                <div className="videoMetaData__stats">
                    <div className="videoMetaData__left">

                        <span>{numeral(viewCount).format('0.a')} views </span>
                         • <span>{moment(publishedAt).fromNow()}</span>
                    </div>
                    <div className="videoMetaData__right">
                        <span className="mr-3"><MdThumbUp size={28} onClick={handleLikeVideo} />{' '} {numeral(likeCount).format('0.a')}</span>
                        <span className="mr-3"><MdThumbDown size={28} onClick={handleDislikeVideo} />{' '} {numeral(dislikeCount).format('0.a')}</span>
                    </div>
                </div>
            </div>
            <div className="videoMetaData__middle">
                <div className="videoMetaData__channel">
                    <div className="videoMetaData__channel__left">
                        <img src={channelSnippet?.thumbnails?.default?.url} alt="thumbnail" className="mr-2" />
                        <span>{channelTitle}</span>
                    </div>
                    <div className="videoMetaData__channel__right">
                        <button>{subscriptionStatus ? "Subscribed" : "Subscribe"}</button>
                        <span>{numeral(channelStatistics?.subscriberCount).format('0.0a')} Subscribers</span>
                    </div>
                </div>
                <div className="videoMetaData__description">
                    <ShowMoreText
                        lines={3}
                        more='SHOW MORE'
                        less='SHOW LESS'
                        anchorClass='showMoreText'
                        onClick={() => { }}
                        expanded={false}
                        width={280}
                    >
                        {description}

                    </ShowMoreText>
                </div>
            </div>
            {/* TODO make it separate component */}
            <div className="videoMetaData__bottom">
                <span>{commentCount} Comments </span>
            </div>

        </div>
    )
}

export default VideoMetaData
