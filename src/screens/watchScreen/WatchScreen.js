import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Comment from '../../components/comment/Comment';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { addComment, getCommentsOfVideoById, } from '../../redux/actions/comments.action';
import { getVideoById, getRelatedVideos } from '../../redux/actions/videos.action';

const WatchScreen = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const relatedVideos = useSelector(state => state.videos.relatedVideos)
    const video = useSelector(state => state.videos.video)
    const loading = useSelector(state => state.videos.loading)
    const comments = useSelector(state => state.comments.comments)
    console.log(video);

    useEffect(() => {
        dispatch(getRelatedVideos())
    }, [dispatch, id])
    useEffect(() => {
        dispatch(getCommentsOfVideoById(id))
    }, [dispatch, id])
    useEffect(() => {
        dispatch(getVideoById(id))
    }, [dispatch, id])

    const [input, setInput] = useState('')

    // console.log(comments);
    //TODO comments might be empty array
    const rawComments = comments?.map(comment => comment.snippet.topLevelComment.snippet)

    const opts = {
        height: '400',
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
        const obj = {
            "snippet": {
                "videoId": id,
                "topLevelComment": {
                    "snippet": {
                        "textOriginal": input
                    }
                }
            }
        }

        dispatch(addComment(obj))
    }
    return (
        <Container fluid>
            <Row>
                <Col lg={8}>
                    <YouTube videoId={id} opts={opts} onReady={_onReady} />
                    <VideoMetaData video={video} />
                    {/* desccription */}
                    {/* comments section */}

                    <form onSubmit={handleComment}>
                        <input type="text" placeholder="write a comment"
                            value={input} onChange={e => setInput(e.target.value)} />
                        <button type="submit">Comment</button>
                    </form>

                    {
                        rawComments?.length > 0 &&
                        rawComments.map(comment => <Comment comment={comment} />)

                    }

                </Col>
                <Col lg={4}>
                    {relatedVideos &&
                        relatedVideos.map(video =>
                            <VideoHorizontal video={video} key={video.etag} />
                        )
                    }

                </Col>
            </Row>

        </Container>
    )
}

export default WatchScreen
