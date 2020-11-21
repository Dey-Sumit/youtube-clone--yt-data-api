import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginButton from '../../components/loginButton/LoginButton'

const LoginScreen = () => {

    const accessToken = useSelector(state => state.auth.accessToken)

    const history = useHistory()

    useEffect(() => {
        if (accessToken)
            history.push('/')
    }, [history, accessToken])

    return (
        <div className="login m-2 p-3">
            <h1>Welcome to YT clone</h1>
            {/* //?FIX THIS */}
            <h3> without features</h3>
            <LoginButton scope="https://www.googleapis.com/auth/youtube.force-ssl" />
            <h3> with features</h3>
            <LoginButton scope="https://www.googleapis.com/auth/youtube.force-ssl" />
        </div>
    )
}

export default LoginScreen
