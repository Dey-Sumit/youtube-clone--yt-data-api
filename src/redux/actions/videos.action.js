import request from '../../api';
import { SET_VIDEOS_ERRORS, SET_POPULAR_VIDEOS, SET_RELATED_VIDEOS, SET_VIDEOS, SET_VIDEO, SET_SUBSCRIPTIONS_VIDEOS } from '../types'

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


export const fetchPopularVideos = () => async (dispatch, getState) => {
    console.log("request fetchPopularVideos");

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
        console.log(data);
        dispatch({
            type: SET_POPULAR_VIDEOS,
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
    console.log("request video by id");

    // if(getState.videos.nextPageToken!==null){

    // }

    try {
        const { data } = await request('/videos', {
            params: {
                part: 'snippet,statistics',
                id: videoId
            }
        })
        console.log(data);
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
    console.log("request video of subs");

    // if(getState.videos.nextPageToken!==null){

    // }

    try {
        const { data } = await request('/subscriptions', {
            params: {
                mine: true,
                part: 'contentDetails,snippet,subscriberSnippet',
                maxResults: 10,
                pageToken: getState().videos.nextPageToken
            },
            headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

        })
        const { items, nextPageToken } = data
        // console.log(items, nextPageToken);

        dispatch({
            type: SET_SUBSCRIPTIONS_VIDEOS,
            payload: {
                videos: items,
                nextPageToken: nextPageToken
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
