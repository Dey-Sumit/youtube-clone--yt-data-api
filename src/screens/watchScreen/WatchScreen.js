import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Comment from '../../components/comment/Comment';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { addComment, getCommentsOfVideoById, } from '../../redux/actions/comments.action';
import { getVideoById, getRelatedVideos } from '../../redux/actions/videos.action';

import './watchScreen.scss'

const WatchScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const relatedVideos = useSelector(state => state.videos.relatedVideos)
    const video = useSelector(state => state.videos.video)
    const loading = useSelector(state => state.videos.loading)
    const comments = useSelector(state => state.comments.comments)

    const { loading: commentCreatedLoading, success: commentCreatedSuccess } = useSelector(state => state.createComment)

    useEffect(() => {
        dispatch(getRelatedVideos(id))
        dispatch(getCommentsOfVideoById(id))
        dispatch(getVideoById(id))
    }, [dispatch, id])

    useEffect(() => {
    }, [dispatch, id])

    useEffect(() => {
        document.title = video?.snippet?.title
    }, [video])

    const [input, setInput] = useState('')

    //TODO comments might be empty array
    const rawComments = comments?.map(comment => comment.snippet.topLevelComment.snippet)

    const user = useSelector(state => state.auth.user)

    const opts = {
        height: '530',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.playVideo();
    }

    const handleComment = (e) => {
        e.preventDefault()
        if (input.length === 0) return


        dispatch(addComment(id, input))
        if (!commentCreatedLoading && commentCreatedSuccess) {
            setInput('')
        }
    }

    return (
        <>
            <Row>
                <Col lg={8}>
                    <YouTube videoId={id} opts={opts} onReady={_onReady} />
                    {video && <VideoMetaData video={video} videoId={id} />}

                    <div className="commentInput">
                        <img src={user?.imageUrl} alt="avatar" className="fluid mr-2" />
                        <form onSubmit={handleComment}>
                            <input type="text" placeholder="write a comment"
                                value={input} onChange={e => setInput(e.target.value)} />
                            <button type="submit">Comment</button>
                        </form>
                    </div>

                    {
                        rawComments?.length > 0 &&
                        rawComments.map(comment => <Comment comment={comment} key={comment.id} />)
                    }

                </Col>
                <Col lg={4}>
                    <h5 className="my-4">Up Next</h5>
                    {relatedVideos?.length > 0 &&
                        relatedVideos.map(video =>
                            <VideoHorizontal video={video} key={video.etag} showDescription={false} />
                        )
                    }

                </Col>
            </Row>

        </>
    )
}

export default WatchScreen
