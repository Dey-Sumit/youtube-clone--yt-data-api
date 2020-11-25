import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_SUBSCRIPTION_STATUS } from "../types"

export const channelReducer = (state = { channel: {}, loading: true, subscriptionStatus: null }, action) => {
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