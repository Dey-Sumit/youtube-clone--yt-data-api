import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPopularVideos, searchVideos } from '../../redux/actions/videos.action'
import Header from '../../components/header/Header'
import Video from '../../components/video/Video'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'

const SearchResultsScreen = () => {
    const { search_query } = useParams()

    const dispatch = useDispatch()

    const videos = useSelector(state => state.videos.videos)
    // const videos = useSelector(state => state.videos.popularVideos)

    // useEffect(() => {
    //     dispatch(fetchPopularVideos())
    // }, [dispatch])

    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log("called-------");
        dispatch(searchVideos(search_query))
    }, [search_query, page, dispatch])

    console.log(videos);

    return (
        <Container fluid className="main">
            {
                videos && videos.map(video =>
                    <VideoHorizontal key={video.etag} video={video} />
                )
            }
        </Container>

    )
}

export default SearchResultsScreen
