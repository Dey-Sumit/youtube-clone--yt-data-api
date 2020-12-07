import axios from "axios";
import { store } from "./redux/store";
// console.log(`TOKEN ${store?.getState()?.auth.accessToken}`);
const request = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyDa2R-fJe6Y2iqEkq4_J9C5ZO0nSaPYXNM",
  },
});

export default request;
