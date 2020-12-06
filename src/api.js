import axios from 'axios'
import { store } from './redux/store';

const request = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    // params: {
    //     key: "AIzaSyDa2R-fJe6Y2iqEkq4_J9C5ZO0nSaPYXNM",

    // },
    headers: { 'Authorization': `Bearer ${store.getState().auth.accessToken}` }

})

export default request;