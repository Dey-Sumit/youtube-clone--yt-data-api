import React from 'react'
import { FiHome } from 'react-icons/fi'
import { AiOutlineFire, AiFillYoutube } from 'react-icons/ai'
import { MdSubscriptions } from 'react-icons/md'

import './sidebar.scss'
import SidebarItem from '../sidebarItem/SidebarItem'

const Sidebar = () => {
    return (
        <div className="sidebar">

            {/* <img src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo-700x394.png" alt=""
                class="youtube-logo" /> */}

            <SidebarItem Icon={AiFillYoutube} text="Youtube Redesign" />
            <SidebarItem Icon={FiHome} text="Home" />
            <SidebarItem Icon={AiOutlineFire} text="Trending" />
            <SidebarItem Icon={MdSubscriptions} text="Subscription" />
            <hr />
            <SidebarItem Icon={AiFillYoutube} text="Youtube Redesign" />
            <SidebarItem Icon={FiHome} text="Home" />
            <SidebarItem Icon={AiOutlineFire} text="Trending" />
            <SidebarItem Icon={MdSubscriptions} text="Subscription" />
            <hr />

        </div>
    )
}

export default Sidebar
