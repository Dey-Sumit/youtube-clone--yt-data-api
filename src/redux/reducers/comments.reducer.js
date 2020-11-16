import { SET_COMMENTS_ERRORS, SET_COMMENTS } from "../types"

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