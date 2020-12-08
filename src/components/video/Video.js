import React, { useEffect, useState } from "react"
import { AiFillEye } from "react-icons/ai"
import { useHistory } from "react-router-dom"
import numeral from "numeral"
import moment from "moment"
import request from "../../api"
import { useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

import "./video.scss"

const Video = ({ video, showChannel = true }) => {
   const history = useHistory()

   const [duration, setDuration] = useState(null)
   const [views, setViews] = useState(null)

   const accessToken = useSelector(state => state.auth.accessToken)
   const {
      id,
      snippet: {
         channelId,
         channelTitle,
         title,
         publishedAt,
         thumbnails: { medium },
      },
      contentDetails,
   } = video

   // const duration = video?.contentDetails?.duration
   // const videoId = video?.contentDetails?.videoId
   const _videoId = id?.videoId || contentDetails?.videoId || id

   const seconds = moment.duration(duration).asSeconds()
   const _duration = moment.utc(seconds * 1000).format("mm:ss")
   const [channelIcon, setChannelIcon] = useState(null)

   useEffect(() => {
      // get the channel thumbnail
      const get_channel_thumbnail = async () => {
         const {
            data: { items },
         } = await request("/channels", {
            params: {
               part: "snippet",
               id: channelId,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         setChannelIcon(items[0].snippet.thumbnails.default)
      }
      if (showChannel) get_channel_thumbnail()
   }, [showChannel, channelId, accessToken])

   useEffect(() => {
      const get_video_details = async () => {
         const {
            data: { items },
         } = await request("/videos", {
            params: {
               part: "contentDetails,statistics",
               id: _videoId,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         //   console.log(data);
         setViews(items[0].statistics.viewCount)
         setDuration(items[0].contentDetails.duration)
      }

      get_video_details(_videoId)
   }, [_videoId, accessToken])

   const handleVideoClick = () => {
      history.push(`/watch/${_videoId}`)
   }

   //  const handleChannelClick = e => {
   //     e.stopPropagation()
   //     history.push(`/channel/${channelId}`)
   //  }

   return (
      <div className="video" onClick={handleVideoClick}>
         <div className="video__top">
            {/* <img src={medium.url} alt="img" /> */}
            <LazyLoadImage effect="blur" src={medium.url} />
            {_duration !== "00:00" && (
               <span className="video__duration">{_duration}</span>
            )}
         </div>

         <p className="video__title">{title}</p>
         <div className="video__details">
            {views && (
               <span>
                  <AiFillEye /> {numeral(views).format("0.a")} Views •{" "}
               </span>
            )}
            <span>{moment(publishedAt).fromNow()}</span>
         </div>

         {showChannel && (
            <div className="video__channel">
               {/* <img
            src={channelIcon && channelIcon.url}
            alt="channel Icons"
            onClick={handleChannelClick}
          /> */}
               <LazyLoadImage
                  effect="black-and-white"
                  src={channelIcon && channelIcon.url}
               />

               <p>{channelTitle}</p>
            </div>
         )}
      </div>
   )
}

export default Video
