import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_SUBSCRIPTION_STATUS, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_SUCCESS } from "../types"

export const channelDetailsReducer = (state = { channel: {}, loading: true, subscriptionStatus: null, }, action) => {
    const { type, payload } = action

    switch (type) {
        case CHANNEL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CHANNEL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                channel: payload,
                success: true
            }
        case CHANNEL_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                success: false
            }
        case CHANNEL_SUBSCRIPTION_STATUS:
            return {
                ...state,
                subscriptionStatus: payload
            }

        default:
            return state
    }
}

export const channelVideosReducer = (state = { loading: true, videos: [] }, action) => {
    const { type, payload } = action

    switch (type) {
        case CHANNEL_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CHANNEL_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case CHANNEL_VIDEOS_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
            }

        default:
            return state
    }
}


