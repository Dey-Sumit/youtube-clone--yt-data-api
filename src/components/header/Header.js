import React, { useState } from 'react'
import './header.scss'

import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { searchVideos } from '../../redux/actions/videos.action'
import { useHistory } from 'react-router-dom'
import YtLogo from '../ytlogo'

const Header = () => {
    const [input, setInput] = useState('')

    const history = useHistory()

    const dispatch = useDispatch()
    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`/search/${input}`)
    }


    return (
        <div className="header">
            <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="yt logo" className="logo" />
            <form className="search" onSubmit={handleSearch}>

                <input type="text" placeholder="Search" className="search__input"
                    value={input} onChange={e => setInput(e.target.value)} />
                <button className="search__button" type="submit">
                    <FaSearch size={22} />
                </button>
            </form>
            <div className="header__user-info">
                <span className="mr-2">Sumit Dey</span>
                <img src="http://unsplash.it/36/36?gravity=center" alt="" />
            </div>
        </div>

    )
}

export default Header
