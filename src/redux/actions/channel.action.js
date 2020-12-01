import request from "../../api";
import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_SUBSCRIPTION_STATUS, CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS } from "../types";

export const getChannelDetails = (id) => async dispatch => {
    try {
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        })

        const { data } = await request('/channels', {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: id,
            }
        })
        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload: data.items[0]
        })
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload: error.message
        })
    }
}


export const checkSubscriptionStatus = (channelId) => async (dispatch, getState) => {
    console.log("status");

    try {
        const { data } = await request('/subscriptions', {
            params: {
                part: 'snippet',
                forChannelId: channelId,
                mine: true
            },
            headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

        })
        console.log(data);
        // if(data.items.length === 0)
        //     return false
        // return true
        dispatch({
            type: CHANNEL_SUBSCRIPTION_STATUS,
            payload: data.items.length !== 0
        })

        //TODO TYPE SET_SUBSCRIPTION_STATUS

    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        // dispatch({
        //     type: SET_VIDEOS_ERRORS,
        //     payload: error.message
        // })
    }
}

export const getAllVideosOfChannel = (id) => async dispatch => {
    dispatch({
        type: CHANNEL_VIDEOS_REQUEST,

    })
    try {
        const { data: { items } } = await request('/channels', {
            params: {
                part: 'contentDetails',
                id: id,
            }
        })
        const uploadsPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
        console.log(uploadsPlaylistId);

        const { data } = await request('/playlistItems', {
            params: {
                part: 'snippet,contentDetails',
                playlistId: uploadsPlaylistId,
                maxResults: 15,
            }
        })
        dispatch({
            type: CHANNEL_VIDEOS_SUCCESS,
            payload: data.items
        })
    } catch (error) {
        dispatch({
            type: CHANNEL_VIDEOS_FAIL
        })
        console.log(error);
    }



    // const { data } = await request('/subscriptions', {
    //     params: {
    //         part: 'snippet',
    //         playlistId: playlistId,

    //     },
    //     headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

    // })
    // try {

    // } catch (error) {
    //     console.log(error.code);
    //     console.log(error.message);
    // }


}