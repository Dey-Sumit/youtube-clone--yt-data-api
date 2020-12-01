import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import YouTube from 'react-youtube';
import Comment from '../../components/comment/Comment';
import SkeletonCard from '../../components/skeleton/SkeletonCard';
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
    // const loading = useSelector(state => state.videos.loading)
    const comments = useSelector(state => state.comments.comments)
    const [input, setInput] = useState('')

    const { loading: commentCreatedLoading, success: commentCreatedSuccess } = useSelector(state => state.createComment)

    useEffect(() => {
        // dispatch(getRelatedVideos(id))
        dispatch(getCommentsOfVideoById(id))
        dispatch(getVideoById(id))
    }, [dispatch, id])

    useEffect(() => {
    }, [dispatch, id])

    useEffect(() => {
        document.title = video?.snippet?.title
    }, [video])


    //TODO comments might be empty array
    const rawComments = comments?.map(comment => comment.snippet.topLevelComment.snippet)

    const user = useSelector(state => state.auth.user)


    const handleComment = (e) => {
        e.preventDefault()
        if (input.length === 0) return

        dispatch(addComment(id, input))
        setInput('')

    }

    return (

        <Row>
            <Col lg={8}>
                <div className="watchScreen__player">
                    {/* <YouTube videoId={id} opts={opts} onReady={_onReady} /> */}
                    <iframe src={`https://www.youtube.com/embed/${id}?controls=1`}
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title={video?.snippet?.title}
                        width='100%'
                        height="100%"
                    />
                </div>

                {video ? <VideoMetaData video={video} videoId={id} /> :
                    <SkeletonCard width="100%" height="200px" count={1} />
                }

                <div className="commentInput">
                    <img src={user?.imageUrl} alt="avatar" className="fluid mr-4" />
                    <form onSubmit={handleComment}>
                        <input type="text" placeholder="write a comment"
                            value={input} onChange={e => setInput(e.target.value)} />
                        <button type="submit" disabled={commentCreatedLoading} >Comment</button>
                    </form>
                </div>

                {
                    rawComments?.length > 0 ?
                        rawComments.map((comment, i) => <Comment comment={comment} key={i} />)
                        : <SkeletonCard width="100%" height="50px" count={15} />
                }

            </Col>
            <Col lg={4}>
                <h5 className="my-3">Up Next</h5>
                {relatedVideos?.length > 0 ?
                    relatedVideos.map(video =>
                        <VideoHorizontal video={video} key={video.etag} showDescription={false} />
                    ) :
                    <SkeletonCard width="100%" height="130px" count={15} />
                }

            </Col>
        </Row>


    )
}

export default WatchScreen
