import request from "../../api";
import { SET_COMMENTS, SET_COMMENTS_ERRORS } from "../types";

export const getCommentsOfVideoById = (videoId) => async dispatch => {
    console.log("request getCommentsOfVideoById");
    try {
        const { data } = await request('/commentThreads', {
            params: {
                part: 'snippet',
                videoId: videoId
            }
        })

        // const comments = data.items.videos.map(video => video.snippet)
        // const comments = data.items.videos.map(video => video.snippet)
        dispatch({
            type: SET_COMMENTS,
            payload: data.items
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SET_COMMENTS_ERRORS,
            payload: error.message
        })
    }
}
