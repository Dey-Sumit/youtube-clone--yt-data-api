import request from '../../api';
import { SET_VIDEOS_ERRORS, SET_POPULAR_VIDEOS, SET_RELATED_VIDEOS, SET_VIDEOS, SET_VIDEO, SET_SUBSCRIPTIONS_VIDEOS, LIKED_VIDEOS_SUCCESS, LIKED_VIDEOS_FAILED, LIKED_VIDEOS_REQUEST } from '../types'

export const getRelatedVideos = (videoId) => async dispatch => {

    try {
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                relatedToVideoId: videoId,
                type: 'video'
            }
        })
        console.log(data);
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
                q,
                type: 'channel,video'
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

export const getLikedVideos = () => async (dispatch, getState) => {
    console.log("request video of liked ");

    // if(getState.videos.nextPageToken!==null){

    // }
    dispatch({
        type: LIKED_VIDEOS_REQUEST
    })

    try {
        const { data } = await request('/videos', {
            params: {
                myRating: 'like',
                part: 'contentDetails,snippet,statistics',
                maxResults: 10,
                pageToken: getState().videos.nextPageToken
            },
            headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

        })
        const { items, nextPageToken } = data
        // console.log(items, nextPageToken);

        dispatch({
            type: LIKED_VIDEOS_SUCCESS,
            payload: {
                videos: items,
                nextPageToken: nextPageToken
            }
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

//TODO ?FIX this

export const rateVideo = (id, type) => async (dispatch, getState) => {
    console.log("request rate a video ");

    // if(getState.videos.nextPageToken!==null){

    // }
    // dispatch({
    //     type: LIKED_VIDEOS_REQUEST
    // })

    try {
        const res = await request('/videos/rate', {
            params: {
                id: id,
                rating: type
            },
            headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

        })
        console.log(res);
        console.log("success");
        // console.log(items, nextPageToken);

        // dispatch({
        //     type: LIKED_VIDEOS_SUCCESS,
        //     payload: {
        //         videos: items,
        //         nextPageToken: nextPageToken
        //     }
        // })


    } catch (error) {
        console.log(error);
        console.log(error.message);
        dispatch({
            type: LIKED_VIDEOS_FAILED,
            payload: error.message
        })
    }

}