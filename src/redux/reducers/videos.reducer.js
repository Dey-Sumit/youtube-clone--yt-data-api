import { SET_VIDEOS_ERRORS, SET_POPULAR_VIDEOS, SET_RELATED_VIDEOS, SET_VIDEOS, SET_VIDEO } from "../types"

const initialState = {
    videos: [],
    popularVideos: [],
    relatedVideos: null,
    loading: false,
    errors: null,
    nextPageToken: null,
    video: null,
    test: 'abc'
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
            console.log(state.popularVideos);
            return {
                ...state,
                popularVideos: [...state.popularVideos, ...payload.videos],
                nextPageToken: payload.nextPageToken
            }
        case SET_RELATED_VIDEOS:
            return {
                ...state,
                relatedVideos: payload
            }
        case SET_VIDEOS_ERRORS:
            return {
                ...state,
                errors: payload
            }
        case SET_VIDEO:
            return {
                ...state,
                video: payload
            }

        default:
            return state
    }
}