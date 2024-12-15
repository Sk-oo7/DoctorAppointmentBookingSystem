import React, { useState } from 'react'
import "../Layout.css"
import { adminMenu, userMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Badge, Collapse, message } from 'antd'
import { useSelector } from 'react-redux'
function Layout({children}) {
  const {user}=useSelector(state=> state.user)

  const [Collapsed, setCollapsed]=useState(false)
  const location=useLocation()
const navigate=useNavigate()
  // logout function
  const handleLogout=()=>{
    localStorage.clear()
    message.success("Logout Successfully")
    navigate("/login")
  }

                    // doctor menu
  const doctorMenu=[{
    name:"Home",
    path:"/",
    icon:"ri-home-2-line"
  },
  {
    name:"Appointments",
    path:"/doctor-appointments",
    icon:"ri-file-list-line" 
  },
  
  {
    name:"Profile",
    path:`/doctor/profile/${user?._id}`,
    icon:"ri-user-line"
  },
  
  ]
  
  const sidebarMenu=user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
  const role=  user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"
  return ( 
      <div className='main'>
       <div className='d-flex layout'>
   <div className={`${Collapsed?'collapsed-sidebar':'sidebar'}`}>
   <div className='logo'>
    <h6>DOC APP</h6> 
    <h6>{role}</h6>
    <hr/>
   </div>
   <div className='menu'>
    {
    sidebarMenu.map(menu=>{
      const isActive=location.pathname===menu.path
      return(
        <>
        <div className={`menu-item ${isActive && 'active'}`}>
<i className={menu.icon} ></i>
{!Collapsed && <Link to={menu.path}>{menu.name}</Link>}

        </div>
        </>
      )
    })
    }
    <div className={`menu-item`} onClick={handleLogout}>
<i className="ri-login-box-line menu.icon" ></i>
{!Collapsed && <Link to="/login">Logout</Link>}

{/* <Link to="/login">Logout</Link> */}

        </div>
    </div>
   </div>
   

       <div className='content'>
         <div className='header'>
          {Collapsed ?(
        <i
         className='ri-menu-2-fill header-action-icon' onClick={()=>setCollapsed(false)}></i>
    ):(
            <i className='ri-close-fill header-action-icon' onClick={()=>setCollapsed(true)}></i>

          )}
<div className='header-content'style={{cursor:"pointer"}}>
  <Badge count={user && user.notification.length} onClick={()=>{navigate("/notification")}}>
  <i className='ri-notification-line header-action-icon'></i>
  </Badge>
          <Link className='anchor'>{user?.name}</Link>
         </div>
         </div>
         
         <div className='body'>
   {children}
         </div>
       </div>
      </div>
      </div>

     )
  
}

export default Layout