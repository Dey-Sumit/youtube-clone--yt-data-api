import React, { useState } from 'react'
import './header.scss'

import { FaSearch, FaBars } from 'react-icons/fa'
import { MdNotifications, MdApps } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Header = ({ toggleShowSidebar }) => {
    const [input, setInput] = useState('')

    const history = useHistory()

    // const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)

    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`/search/${input}`)
    }


    return (
        <div className="header">
            <FaBars size={26} className="header__menu" onClick={() => toggleShowSidebar()} />
            <img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="yt logo" className="header__logo" />

            <form className="search" onSubmit={handleSearch}>
                <input type="text" placeholder="Search" className="search__input"
                    value={input} onChange={e => setInput(e.target.value)} />
                <button className="search__button" type="submit">
                    <FaSearch size={22} />
                </button>
            </form>
            <div className="header__icons">
                <MdNotifications />
                <MdApps />
            </div>
            <div className="header__user-info">
                {/* only large screen <span className="mr-3">{user.givenName}</span> */}
                <img src={user?.picture} alt="avatar" className="fluid" />
            </div>
        </div>

    )
}

export default Header
