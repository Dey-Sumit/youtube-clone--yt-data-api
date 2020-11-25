import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth.action';

const LoginButton = ({ scope }) => {
    const dispatch = useDispatch()

    const responseGoogle = (res) => {
        dispatch(login(res))
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
