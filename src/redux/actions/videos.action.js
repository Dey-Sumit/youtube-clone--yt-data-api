import request from '../../api';
import { SET_VIDEOS_ERRORS, SET_RELATED_VIDEOS, SET_VIDEOS, SET_VIDEO, RATE_VIDEO_SUCCESS, RATE_VIDEO_FAIL, LIKED_VIDEOS_SUCCESS, LIKED_VIDEOS_FAILED, LIKED_VIDEOS_REQUEST, SEARCHED_VIDEOS_SUCCESS, SEARCHED_VIDEOS_FAILED, SEARCHED_VIDEOS_REQUEST, SUBSCRIPTIONS_VIDEOS_REQUEST, SUBSCRIPTIONS_VIDEOS_SUCCESS, SUBSCRIPTIONS_VIDEOS_FAILED } from '../types'

export const getRelatedVideos = (videoId) => async dispatch => {

    try {
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                relatedToVideoId: videoId,
                type: 'video',
                maxResults: 15
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
// make separate reducers

export const searchVideos = (q) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCHED_VIDEOS_REQUEST
        })


        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                q,
                type: 'channel,video',
                maxResults: 15
            }
        })

        dispatch({
            type: SEARCHED_VIDEOS_SUCCESS,
            payload: data.items
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: SEARCHED_VIDEOS_FAILED,
            payload: error.message
        })
    }

}


export const fetchPopularVideos = () => async (dispatch, getState) => {

    // if(getState.videos.nextPageToken!==null){

    // }

    try {
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 15,
                pageToken: getState().videos.nextPageToken
            }
        })
        dispatch({
            type: SET_VIDEOS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken
            }
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
export const getVideoById = (videoId) => async (dispatch, getState) => {

    // if(getState.videos.nextPageToken!==null){

    // }

    try {
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,statistics',
                id: videoId
            }
        })
        dispatch({
            type: SET_VIDEO,
            payload: data.items[0]

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

export const getSubscriptionsVideos = () => async (dispatch, getState) => {

    dispatch({
        type: SUBSCRIPTIONS_VIDEOS_REQUEST
    })

    try {
        const { data } = await request('/subscriptions', {
            params: {
                mine: true,
                part: 'contentDetails,snippet,subscriberSnippet',
                maxResults: 15,
            },

        })
        // console.log(items, nextPageToken);

        dispatch({
            type: SUBSCRIPTIONS_VIDEOS_SUCCESS,
            payload: data.items
        })


    } catch (error) {
        console.log(error);
        console.log(error.message);
        dispatch({
            type: SUBSCRIPTIONS_VIDEOS_FAILED,
            payload: error.message
        })
    }

}

export const getLikedVideos = () => async (dispatch, getState) => {
    dispatch({
        type: LIKED_VIDEOS_REQUEST
    })

    try {
        const { data } = await request('/videos', {
            params: {
                myRating: 'like',
                part: 'contentDetails,snippet,statistics',
                maxResults: 15,
            },

        })
        const { items } = data
        // console.log(items, nextPageToken);

        dispatch({
            type: LIKED_VIDEOS_SUCCESS,
            payload: items
        })


    } catch (error) {
        console.log(error);
        console.log(error.message);
        dispatch({
            type: LIKED_VIDEOS_FAILED,
            payload: error.message
        })
    }

}



export const rateVideo = (id, type) => async (dispatch) => {
    try {
        await request.post('/videos/rate', null, {
            params: {
                id: id,
                rating: type
            },
        })
        dispatch({
            type: RATE_VIDEO_SUCCESS,
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: RATE_VIDEO_FAIL,
            payload: error.message
        })
    }

}