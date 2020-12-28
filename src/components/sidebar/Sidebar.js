import React from "react"
// import { FiHome } from "react-icons/fi"
// import { AiOutlineFire } from "react-icons/ai"
import {
   MdSubscriptions,
   MdExitToApp,
   MdThumbUp,
   MdHistory,
   MdLibraryBooks,
   MdHome,
   MdSentimentDissatisfied,
} from "react-icons/md"
import SidebarItem from "../sidebarItem/SidebarItem"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/actions/auth.action"

import "./sidebar.scss"

const Sidebar = ({ showSidebar }) => {
   const dispatch = useDispatch()

   const handleLogout = () => {
      dispatch(logout())
   }

   return (
      <div className={showSidebar ? "sidebar open" : "sidebar"}>
         <Link to="/">
            <SidebarItem Icon={MdHome} text="Home" />
         </Link>

         <Link to="/feed/subscriptions">
            <SidebarItem Icon={MdSubscriptions} text="Subscription" />
         </Link>

         <Link to="/feed/likedVideos">
            <SidebarItem Icon={MdThumbUp} text="Liked Videos" />
         </Link>

         {/* <SidebarItem Icon={AiOutlineFire} text="Explore" /> */}

         <SidebarItem Icon={MdHistory} text="Just to" />

         <SidebarItem Icon={MdLibraryBooks} text="Populate" />
         <SidebarItem Icon={MdSentimentDissatisfied} text="Sidebar" />

         <hr />
         <div onClick={handleLogout}>
            <SidebarItem Icon={MdExitToApp} text="Log Out" />
         </div>
         <hr />
      </div>
   )
}

export default Sidebar
