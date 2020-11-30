import React from 'react'
import './sidebarItem.scss'

const SidebarItem = ({ Icon, text }) => {
    return (
        <div className="sidebar__item">
            <Icon size={22} />
            <span className="ml-3 sidebar__item__text">{text}</span>
        </div>
    )
}

export default SidebarItem
