import React from 'react';
import './comment.scss';

const Comment = ({ comment: { authorChannelId, authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } }) => {
    console.log(authorDisplayName);
    return (
        <div className="comment">
            <img src={authorProfileImageUrl} alt="name" />
            <div className="comment__info">
                <div className="comment__header">
                    <span className="comment__author">{authorDisplayName}</span>
                    <span className="comment__date">{publishedAt}</span>

                </div>
                <div className="comment__text">
                    {textDisplay}
                </div>
            </div>

        </div>
    );
};

export default Comment;