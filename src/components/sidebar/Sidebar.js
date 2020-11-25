import React from 'react'
import { FiHome } from 'react-icons/fi'
import { AiOutlineFire, AiFillYoutube } from 'react-icons/ai'
import { MdSubscriptions, MdExitToApp, MdThumbUp } from 'react-icons/md'

import './sidebar.scss'
import SidebarItem from '../sidebarItem/SidebarItem'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth.action'

const Sidebar = ({ showSidebar }) => {
    //TODO handle in redux
    const dispatch = useDispatch()

    const handleLogout = () => {
        console.log("clicked");
        dispatch(logout())
    }

    return (

        <div className={showSidebar ? 'sidebar open' : 'sidebar'}>
            <SidebarItem Icon={FiHome} text="Home" />

            <Link to="/feed/subscriptions">
                <SidebarItem Icon={AiOutlineFire} text="Explore" />
            </Link>

            <Link to="/feed/subscriptions">
                <SidebarItem Icon={MdSubscriptions} text="Subscription" />
            </Link>

            <Link to="/feed/likedVideos">
                <SidebarItem Icon={MdThumbUp} text="Liked Videos" />
            </Link>

            <hr />
            <div onClick={handleLogout} >
                <SidebarItem Icon={MdExitToApp} text="Log Out" />
            </div>
            <hr />

        </div>
    )
}

export default Sidebar
