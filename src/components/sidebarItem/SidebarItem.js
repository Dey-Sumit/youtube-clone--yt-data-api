import React from 'react'
import './sidebarItem.scss'

const SidebarItem = ({ Icon, text }) => {
    return (
        <div className="sidebar__item">
            <Icon color="#8E8D92" />
            <span className="ml-3 sidebar__item__text">{text}</span>
        </div>
    )
}

export default SidebarItem
