import axios from 'axios'
import { store } from './redux/store';

const request = axios.create({
    method: 'get',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY
    },

    // headers: { Authorization: `Bearer ${store.getState().accessToken}` }

})

export default request;