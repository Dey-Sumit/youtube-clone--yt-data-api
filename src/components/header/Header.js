import React, { useState } from 'react'
import './header.scss'

import { FaSearch } from 'react-icons/fa'

const Header = () => {
    const [input, setInput] = useState('')
    return (
        <div className="header">
            <form className="search">
                <input type="text" placeholder="Search" className="search__input"
                    value={input} onChange={e => setInput(e.target.value)} />

                <button className="search__button">
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
