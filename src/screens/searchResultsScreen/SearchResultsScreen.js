import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchVideos } from '../../redux/actions/videos.action'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'

import './searchResultScreen.scss'
import InfiniteScroll from 'react-infinite-scroll-component'

const SearchResultsScreen = () => {
    const { search_query } = useParams()

    const dispatch = useDispatch()

    const videos = useSelector(state => state.videos.videos)


    const [page, setPage] = useState(1)

    useEffect(() => {
        dispatch(searchVideos(search_query))
    }, [search_query, page, dispatch])


    return (

        <>
            {
                videos?.length > 0 &&
                <InfiniteScroll
                    dataLength={videos.length}
                    next={() => setPage(page => page + 1)}
                    hasMore={true}
                    loader={<div class="spinner-border text-danger d-block mx-auto" />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                ><Container className="watchScreen">
                        {
                            videos.map(video =>
                                <VideoHorizontal key={video.etag} video={video} />
                            )
                        }
                    </Container>
                </InfiniteScroll>
            }
        </>

    )
}

export default SearchResultsScreen
