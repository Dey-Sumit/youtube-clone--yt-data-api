import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'

const VideoHorizontal = () => {

    const { id: { videoId }, snippet: { channelId, channelTitle, description, title, publishedAt, thumbnails: { high, standard, medium } } } = video
    //TODO FIX id contains videoId,channelID,playlistId
    const history = useHistory()
    const handleVideoClick = () => {
        history.push(`/watch/${videoId}`)
    }
    const handleChannelClick = () => {

    }
    function truncate(str, n = 50) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <div className="p-2 video" onClick={handleVideoClick}>
            {/* <a href="!" class="video__thumbnail" data-duration="12:24"> */}
            {/* <img src={medium.url} alt="unsplash" class="video__thumbnail__image" /> */}
            <div class="video__thumbnail__image" />
            {/* </a> */}
            <div class="video__bottom">
                <a href="!">
                    <img src="http://unsplash.it/36/36?gravity=center" alt="" class="video__channel-icon" />
                </a>
                <div class="video__details">
                    {/* <p class="video__title">{truncate(title)}</p> */}
                    <p class="video__title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe labore deserunt corporis at magni architecto repellat nobis, vel vitae inventore, dolorum et neque amet ad ratione sapiente. Blanditiis, et! Placeat officia eius dignissimos. Quaerat doloribus molestias provident iste cum,
                    voluptate esse repudiandae expedita, commodi reiciendis perferendis distinctio ipsum deleniti quidem.</p>
                    {/* <p class="video__channel-name">{channelTitle}</p>
                    <div class="video__metadata">
                        <span><AiFillEye /> 12k </span>

                        <span>• 1 week ago</span>
                    </div> */}
                </div>
            </div>
        </div >

    )
}

export default VideoHorizontal
