import React, { useEffect } from 'react'

import { Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import Video from '../../components/video/Video'

import {
   fetchCategoriesVideos,
   fetchHomeVideos,
} from '../../redux/actions/videos.action'
import './homeScreen.scss'

// import SkeletonCard from '../../components/skeleton/SkeletonCard'
import SkeletonVideo from '../../components/skeleton/SkeletonVideo'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import { SET_ACTIVE_CATEGORY } from '../../redux/types'

const HomeScreen = () => {
   const dispatch = useDispatch()

   const { accessToken } = useSelector(state => state.auth)
   const { videos, activeCategory } = useSelector(state => state.homeVideos)

   const history = useHistory()

   const nextPage = () => {
      console.log('next page')
      if (activeCategory === 'All') {
         dispatch(fetchHomeVideos())
      } else {
         dispatch({
            type: SET_ACTIVE_CATEGORY,
            payload: activeCategory,
         })
         dispatch(fetchCategoriesVideos(activeCategory))
      }
   }
   useEffect(() => {
      document.title = 'Youtube using Youtube'
   }, [])

   useEffect(() => {
      if (!accessToken) history.push('/auth')
      else dispatch(fetchHomeVideos())
   }, [history, dispatch, accessToken])

   return (
      <Container>
         <CategoriesBar />
         <InfiniteScroll
            dataLength={videos.length}
            next={() => nextPage()}
            hasMore={true}
            className='row'
            loader={
               <div className='spinner-border text-danger d-block mx-auto' />
            }
            endMessage={
               <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
               </p>
            }>
            {videos.length > 0
               ? videos.map(video => (
                    <Col md={4} lg={3} key={video.id?.videoId || video.id}>
                       <Video video={video} />
                    </Col>
                 ))
               : [...Array(16)].map((_, i) => (
                    <Col md={4} lg={3} key={i}>
                       <SkeletonVideo />
                    </Col>
                 ))}
         </InfiniteScroll>
      </Container>
   )
}

export default HomeScreen
