import React from 'react'

const VideoMetaData = ({ video: { snippet, statistics } }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet
    const { commentCount, dislikeCount, likeCount, viewCount } = statistics

    return (
        <div className="videoMetaData">
            <div className="videoMetaData__top">
                <h5>{title}</h5>
                <div className="videoMetaData__stats">
                    <span>{viewCount}</span> <span>{publishedAt}</span>
                    <div className="videoMetaData__buttons">
                        <span>{likeCount}</span>
                        <span>{dislikeCount}</span>
                    </div>
                </div>
            </div>
            <div className="videoMetaData__middle">
                <div className="videoMetaData__channel">
                    <img src="" alt="" />
                    <span>subs</span>
                    <button>Subscribe</button>
                </div>
                <div className="videoMetaData__description">
                    {description}
                </div>
            </div>
            <div className="videoMetaData__bottom">
                <span>{commentCount} Comments </span>
            </div>

        </div>
    )
}

export default VideoMetaData
