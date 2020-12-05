import request from '../../api';
import { SET_VIDEO, RATE_VIDEO_SUCCESS, RATE_VIDEO_FAIL, LIKED_VIDEOS_SUCCESS, LIKED_VIDEOS_FAILED, LIKED_VIDEOS_REQUEST, SEARCHED_VIDEOS_SUCCESS, SEARCHED_VIDEOS_FAILED, SEARCHED_VIDEOS_REQUEST, SUBSCRIPTIONS_VIDEOS_REQUEST, SUBSCRIPTIONS_VIDEOS_SUCCESS, SUBSCRIPTIONS_VIDEOS_FAILED, RELATED_VIDEOS_FAILED, RELATED_VIDEOS_SUCCESS, RELATED_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, HOME_VIDEOS_FAILED, HOME_VIDEOS_REQUEST, SELECTED_VIDEO_SUCCESS, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_FAILED } from '../types'

export const getRelatedVideos = (videoId) => async dispatch => {
    dispatch({
        type: RELATED_VIDEOS_REQUEST
    })
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
            type: RELATED_VIDEOS_SUCCESS,
            payload: data.items
        })
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        dispatch({
            type: RELATED_VIDEOS_FAILED,
            payload: error.message
        })
    }
}


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
                maxResults: 16
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


export const fetchHomeVideos = () => async (dispatch, getState) => {

    dispatch({
        type: HOME_VIDEOS_REQUEST
    })
    try {
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 16,
                pageToken: getState().homeVideos.nextPageToken
            },
            headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: 'All'
            }
        })

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: HOME_VIDEOS_FAILED,
            payload: error.message
        })
    }

}


export const fetchCategoriesVideos = (q) => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST
        })


        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                q,
                type: 'video',
                maxResults: 16,
                pageToken: getState().homeVideos.nextPageToken

            }
        })

        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: q

            }
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: HOME_VIDEOS_FAILED,
            payload: error.message
        })
    }

}


export const getVideoById = (videoId) => async (dispatch) => {
    try {

        dispatch({
            type: SELECTED_VIDEO_REQUEST
        })

        const { data } = await request('/videos', {
            params: {
                part: 'snippet,statistics',
                id: videoId
            }
        })
        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: data.items[0]

        })

    } catch (error) {
        console.log(error);
        console.log(error.message);
        dispatch({
            type: SELECTED_VIDEO_FAILED,
            payload: error.message
        })
    }

}


export const getSubscriptionsVideos = () => async (dispatch) => {

    dispatch({
        type: SUBSCRIPTIONS_VIDEOS_REQUEST
    })

    try {
        const { data } = await request('/subscriptions', {
            params: {
                mine: true,
                part: 'contentDetails,snippet,subscriberSnippet',
                maxResults: 16,
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


export const getLikedVideos = () => async (dispatch) => {
    dispatch({
        type: LIKED_VIDEOS_REQUEST
    })

    try {
        const { data } = await request('/videos', {
            params: {
                myRating: 'like',
                part: 'contentDetails,snippet,statistics',
                maxResults: 16,
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