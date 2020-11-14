import axios from 'axios'
import { SET_ERRORS, SET_POPULAR_VIDEOS, SET_RELATED_VIDEOS, SET_VIDEOS } from '../types'

const request = axios.create({
    method: 'get',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY
    }
})

export const getRelatedVideos = (videoId) => async dispatch => {
    try {
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                relatedToVideoId: videoId,
                type: 'video'
            }
        })
        dispatch({
            type: SET_RELATED_VIDEOS,
            payload: data.items
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.message
        })
    }
}



export const searchVideos = (q) => async dispatch => {
    try {
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                q
            }
        })
        dispatch({
            type: SET_VIDEOS,
            payload: data.items
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.message
        })
    }

}


export const fetchPopularVideos = () => async dispatch => {
    try {
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 15
            }
        })
        dispatch({
            type: SET_POPULAR_VIDEOS,
            payload: data.items
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SET_ERRORS,
            payload: error.message
        })
    }

}

