import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginButton from '../../components/loginButton/LoginButton'

import './loginScreen.scss'

const LoginScreen = () => {

    const accessToken = useSelector(state => state.auth.accessToken)

    const history = useHistory()

    useEffect(() => {
        if (accessToken)
            history.push('/')
    }, [history, accessToken])

    return (
        <div className="loginScreen">
            <div className="login">
                <img src="https://seeklogo.com/images/Y/youtube-logo-FF3BEE4378-seeklogo.com.png" alt="yt-logo" className="login__logo" />
                <h2 className="mb-4">Youtube Clone</h2>
                <LoginButton scope="https://www.googleapis.com/auth/youtube.force-ssl" />
                <p className="my-2">A Youtube clone project made using Youtube-api  </p>
                <p className="my-1">(This app does not collect your data) </p>
            </div>
        </div>
    )
}

export default LoginScreen
