import { SET_VIDEOS_ERRORS, SET_POPULAR_VIDEOS, SEARCHED_VIDEOS_REQUEST, SEARCHED_VIDEOS_SUCCESS, SEARCHED_VIDEOS_FAILED, SET_RELATED_VIDEOS, SET_VIDEOS, SET_VIDEO, SET_SUBSCRIPTIONS_VIDEOS, LIKED_VIDEOS_SUCCESS, LIKED_VIDEOS_REQUEST, LIKED_VIDEOS_FAILED, SUBSCRIPTIONS_VIDEOS_REQUEST, SUBSCRIPTIONS_VIDEOS_SUCCESS, SUBSCRIPTIONS_VIDEOS_FAILED } from "../types"

const initialState = {
    videos: [],
    subscriptionVideos: [],
    likedVideos: [],
    relatedVideos: [],
    loading: false,
    errors: null,
    nextPageToken: null,
    video: null,
}

export const videosReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        // case SET_VIDEOS:
        //     return {
        //         ...state,
        //         videos: payload,
        //         error: null
        //     }

        case SET_VIDEOS:
            // console.log(state.popularVideos);
            return {
                ...state,
                videos: [...state.videos, ...payload.videos],
                nextPageToken: payload.nextPageToken
            }

        case SET_SUBSCRIPTIONS_VIDEOS:
            return {
                ...state,
                subscriptionVideos: [...state.subscriptionVideos, ...payload.videos],
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


export const likedVideosReducer = (state = { loading: true, videos: null }, action) => {
    const { type, payload } = action

    switch (type) {
        case LIKED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
                error: null
            }

        case LIKED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case LIKED_VIDEOS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            }


        default:
            return state
    }
}

export const rateVideosReducer = (state = {}, action) => {

}

export const searchedVideosReducer = (state = { loading: true, videos: [] }, action) => {
    const { type, payload } = action

    switch (type) {

        case SEARCHED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SEARCHED_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
                error: null
            }


        case SEARCHED_VIDEOS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload

            }


        default:
            return state
    }
}
export const subscriptionsVideosReducer = (state = { loading: true, videos: [] }, action) => {
    const { type, payload } = action

    switch (type) {

        case SUBSCRIPTIONS_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SUBSCRIPTIONS_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
                error: null
            }


        case SUBSCRIPTIONS_VIDEOS_FAILED:
            return {
                ...state,
                loading: false,
                error: payload

            }


        default:
            return state
    }
}