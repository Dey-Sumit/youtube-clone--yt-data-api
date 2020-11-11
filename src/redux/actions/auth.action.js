import { LOGIN_SUCCESS } from "../types"


export const login = () => dispatch => {

    const { accessToken, profileObj } = data
    dispatch({
        type: LOGIN_SUCCESS,
        payload: accessToken

    })
}