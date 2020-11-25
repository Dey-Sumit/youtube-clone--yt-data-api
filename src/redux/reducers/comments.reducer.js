import { SET_COMMENTS_ERRORS, SET_COMMENTS, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILED, CREATE_COMMENT_REQUEST } from "../types"

const initialState = {
    comments: null,
    loading: false,
    errors: null
}

export const commentsReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: payload
            }

        case SET_COMMENTS_ERRORS:
            return {
                ...state,
                errors: payload
            }

        default:
            return state
    }
}

export const createCommentReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false
            }

        case CREATE_COMMENT_FAILED:
            return {
                ...state,
                loading: true,
                errors: payload
            }
        case CREATE_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}