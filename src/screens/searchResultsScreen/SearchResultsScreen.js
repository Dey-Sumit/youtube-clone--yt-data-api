import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPopularVideos, searchVideos } from '../../redux/actions/videos.action'
import Header from '../../components/header/Header'
import Video from '../../components/video/Video'
const SearchResultsScreen = () => {
    const { search_query } = useParams()

    const dispatch = useDispatch()

    // const videos = useSelector(state => state.videos.videos)
    const videos = useSelector(state => state.videos.popularVideos)

    useEffect(() => {
        dispatch(fetchPopularVideos())
    }, [dispatch])
    // useEffect(() => {
    //     dispatch(searchVideos(search_query))
    // }, [dispatch, search_query])

    return (
        <Container fluid className="main">
            <Header />

            <Video />

            {/* <Row className="mt-4">

                {
                    videos && videos.map(video =>

                        <Video key={video.etag} video={video} />

                    )
                }


            </Row> */}

        </Container>

    )
}

export default SearchResultsScreen
