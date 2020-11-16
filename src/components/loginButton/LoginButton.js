import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../../redux/types';

const LoginButton = ({ scope }) => {
    const dispatch = useDispatch()

    const responseGoogle = (res) => {
        console.log("fired");
        const { accessToken, profileObj } = res
        console.log(res);
        dispatch(
            {
                type: LOGIN_SUCCESS,
                payload: accessToken
            })
    }
    const handleError = (res) => console.log("error", res);
    return (

        <GoogleLogin
            clientId={process.env.REACT_APP_YOUTUBE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={handleError}
            cookiePolicy={'single_host_origin'}
            scope={scope}
        />

    )
}

export default LoginButton
