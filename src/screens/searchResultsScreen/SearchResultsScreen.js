import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchVideos } from '../../redux/actions/videos.action'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'

const SearchResultsScreen = () => {
    const { search_query } = useParams()

    const dispatch = useDispatch()

    const videos = useSelector(state => state.videos.videos)


    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(searchVideos(search_query))
    }, [search_query, page, dispatch])


    return (
        <Container fluid className="main">
            {
                videos?.length > 0 && videos.map(video =>
                    <VideoHorizontal key={video.etag} video={video} />
                )
            }
        </Container>

    )
}

export default SearchResultsScreen
