import { LOGIN_SUCCESS, LOGOUT, SET_PROFILE, } from "../types"

const initialState = {
    accessToken: localStorage.getItem("yt-access-token") ? localStorage.getItem("yt-access-token") : null,
    user: localStorage.getItem("yt-user") ? JSON.parse(localStorage.getItem("yt-user")) : null
}

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    // console.log(type, payload);
    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("yt-access-token", payload)
            return {
                ...state,
                // shift this to access creator
                accessToken: payload
            }
        case SET_PROFILE:
            return {
                ...state,
                user: payload
            }

        case LOGOUT:
            localStorage.removeItem("yt-access-token")
            localStorage.removeItem("yt-user")
            return {
                ...state,
                // shift this to access creator
                accessToken: null,
                user: null
            }
        default:
            return state
    }
}