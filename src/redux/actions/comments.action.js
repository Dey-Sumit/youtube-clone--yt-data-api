import request from "../../api";
import { CREATE_COMMENT_FAILED, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, SET_COMMENTS, SET_COMMENTS_ERRORS } from "../types";

export const getCommentsOfVideoById = (videoId) => async dispatch => {
    try {
        const { data } = await request('/commentThreads', {
            params: {
                part: 'snippet',
                videoId: videoId
            }
        })
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

export const addComment = (id, text) => async (dispatch, getState) => {

    dispatch({
        type: CREATE_COMMENT_REQUEST
    })
    const obj = {
        "snippet": {
            "videoId": id,
            "topLevelComment": {
                "snippet": {
                    "textOriginal": text
                }
            }
        }
    }
    try {
        await request.post('/commentThreads', obj, {
            params: {
                part: 'snippet',
            },
            headers: { 'Authorization': `Bearer ${getState().auth.accessToken}` }

        })
        dispatch({
            type: CREATE_COMMENT_SUCCESS
        })

        //TODO loadComments()
        setTimeout(() => {
            dispatch(getCommentsOfVideoById(id))

        }, 2000)
    } catch (error) {
        console.log(error);
        dispatch({
            type: CREATE_COMMENT_FAILED,
            payload: error.message
        })
    }
}
