import axios from 'axios'
import { SET_VIDEOS } from '../types'

export const fetchVideos = () => async dispatch => {
    console.log("here");
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            q: 'Backbench Coder',
            key: 'AIzaSyBcgnhm-BdEzBmhIJKAzBGytCVC-0Avc9o'
        }
    })
    console.log(data);
    dispatch({
        type: SET_VIDEOS,
        payload: data.items
    })
}