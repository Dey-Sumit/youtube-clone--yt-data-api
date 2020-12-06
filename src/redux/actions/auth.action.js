import { signInWithGoogle } from "../../firebase"
import { LOGIN_SUCCESS, LOGOUT, SET_PROFILE } from "../types"
import { auth } from '../../firebase'

export const login = () => async dispatch => {
    const res = await signInWithGoogle()

    const accessToken = res.credential.accessToken
    const profile = res.additionalUserInfo.profile

    localStorage.setItem("yt-access-token", accessToken)
    localStorage.setItem("yt-user", JSON.stringify(profile))

    dispatch({
        type: LOGIN_SUCCESS,
        payload: accessToken
    })

    dispatch({
        type: SET_PROFILE,
        payload: profile
    })
}

//TODO handle logout can be accessed by yt button
export const logout = () => async dispatch => {

    localStorage.removeItem('yt-access-token')
    localStorage.removeItem('yt-user')
    await auth.signOut()
    dispatch({
        type: LOGOUT
    })

}