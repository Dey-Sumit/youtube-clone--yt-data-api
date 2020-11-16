import axios from 'axios'

const request = axios.create({
    method: 'get',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY
    }
})

export default request;