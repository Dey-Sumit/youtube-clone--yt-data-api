import { LOGIN_SUCCESS, LOGOUT, } from "../types"

const initialState = {
    accessToken: localStorage.getItem("yt-access-token") ? localStorage.getItem("yt-access-token") : null,
    user: null
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
                access_token: payload
            }
        case LOGOUT:
            return {
                ...state,
                // shift this to access creator
                access_token: null,
                user: null
            }
        default:
            return state
    }
}