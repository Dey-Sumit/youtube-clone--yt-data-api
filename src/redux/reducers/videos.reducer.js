import { SET_ERRORS, SET_POPULAR_VIDEOS, SET_VIDEOS } from "../types"

const initialState = {
    videos: null,
    popularVideos: null,
    loading: false,
    errors: null
}

export const videosReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_VIDEOS:
            return {
                ...state,
                videos: payload
            }
        case SET_POPULAR_VIDEOS:
            return {
                ...state,
                popularVideos: payload
            }
        case SET_ERRORS:
            return {
                ...state,
                errors: payload
            }

        default:
            return state
    }
}