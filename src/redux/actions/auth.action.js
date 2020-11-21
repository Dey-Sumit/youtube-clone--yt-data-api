import { LOGIN_SUCCESS, LOGOUT, SET_PROFILE } from "../types"


export const login = (data) => dispatch => {

    const { accessToken, profileObj } = data

    dispatch({
        type: LOGIN_SUCCESS,
        payload: accessToken
    })
    dispatch({
        type: SET_PROFILE,
        payload: profileObj
    })
}

//TODO handle logout can be accessed by yt button
export const logout = () => dispatch => {

    localStorage.removeItem('yt-access-token')
    dispatch({
        type: LOGOUT
    })

}