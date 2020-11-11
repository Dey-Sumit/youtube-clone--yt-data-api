import React from 'react'
import LoginButton from '../../components/loginButton/LoginButton'

const LoginScreen = () => {
    return (
        <div className="login">
            <h1>Welcome to YT clone</h1>
            <h3> without features</h3>
            <LoginButton scope="https://www.googleapis.com/auth/youtube.force-ssl" />
            <h3> with features</h3>
            <LoginButton scope="https://www.googleapis.com/auth/youtube.force-ssl" />
        </div>
    )
}

export default LoginScreen
