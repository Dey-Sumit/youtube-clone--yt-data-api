import request from '../../api';
import { SET_VIDEOS_ERRORS, SET_POPULAR_VIDEOS, SET_RELATED_VIDEOS, SET_VIDEOS } from '../types'

export const getRelatedVideos = (videoId) => async dispatch => {
    console.log("request getCommentsOfVideoById");

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
        console.log(error.code);
        console.log(error.message);
        dispatch({
            type: SET_VIDEOS_ERRORS,
            payload: error.message
        })
    }
}




export const searchVideos = (q) => async dispatch => {
    console.log("request searchVideos");

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
            type: SET_VIDEOS_ERRORS,
            payload: error.message
        })
    }

}


export const fetchPopularVideos = () => async dispatch => {
    console.log("request fetchPopularVideos");

    try {
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 15
            }
        })
        console.log();
        dispatch({
            type: SET_POPULAR_VIDEOS,
            payload: data.items
        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        dispatch({
            type: SET_VIDEOS_ERRORS,
            payload: error.message
        })
    }

}

