import React from 'react'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth.action';


// https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1

// const get_access_token = (authCode) => {
//     console.log(authCode);
//     console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
//     console.log(process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
//     var options = {
//         method: 'POST',
//         url: 'https://oauth2.googleapis.com/token',
//         headers: { 'content-type': 'application/x-www-form-urlencoded' },
//         data: {
//             grant_type: 'authorization_code',
//             client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//             client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
//             code: authCode,
//             redirect_uri: 'http://localhost:3000'
//         }
//     };

//     axios.request(options).then(function (response) {
//         console.log(response.data);
//     }).catch(function (error) {
//         console.error(error);
//     });

// }
const LoginButton = ({ scope }) => {


    const dispatch = useDispatch()

    const responseGoogle = (res) => {
        console.log(res);
        // get_access_token(res.code)
        dispatch(login(res))
    }

    const handleError = (res) => console.log("error", res);

    return (

        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={handleError}
            accessType="offline"
            responseType="code"
            fetchBasicProfile
            scope={scope}
        />

    )
}

export default LoginButton
