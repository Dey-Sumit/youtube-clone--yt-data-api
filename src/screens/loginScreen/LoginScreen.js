import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
// import LoginButton from '../../components/loginButton/LoginButton'

import { login } from '../../redux/actions/auth.action'

import './loginScreen.scss'

const LoginScreen = () => {

    const accessToken = useSelector(state => state.auth.accessToken)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (accessToken)
            history.push('/')
    }, [history, accessToken])


    const handleLogin = () => {
        dispatch(login())
    }

    return (
        <div className="loginScreen">
            <div className="login">
                <img src="https://seeklogo.com/images/Y/youtube-logo-FF3BEE4378-seeklogo.com.png" alt="yt-logo" className="login__logo" />
                <h2 className="mb-4">Youtube Clone</h2>

                <button onClick={handleLogin}>Login With Google</button>

                <p className="my-2">A Youtube clone project made using Youtube-api  </p>
                <p className="my-1">(This app does not collect your data) </p>
            </div>
        </div>
    )
}

export default LoginScreen
