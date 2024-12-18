import { Tabs, message } from "antd"
import Layout from "../components/Layout"
import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { hideLoading, showLoading } from "../redux/features/alertSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function NotificationPage() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
const {user} =useSelector((state)=>state.user)
const handleMarkAllRead=async()=>{
try{
dispatch(showLoading())
const res=await axios.post("/api/user/get-all-notification",{userId:user._id},
{
headers:{
  Authorization:`Bearer ${localStorage.getItem('token')}`
}}
)
dispatch(hideLoading())
if(res.data.success){
  message.success(res.data.message)
  window.location.reload()

}
else{
  message.error(res.data.message)
}
}
catch(error){
  dispatchEvent(hideLoading())
console.log(error)
message.error("something went wrong")
}
}
const handleDeleteAllRead=async()=>{
try{
dispatch(showLoading())
const res=await axios.post('/api/user/delete-all-notification',{userId:user._id},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
  }
})
dispatch(hideLoading())
if(res.data.success){
  message.success(res.data.message)
}
else{
  message.error(res.data.message)
}
}
catch(error){
console.log(error)
message.error('Something went wrong in notifications')
}
}
  return (
    <Layout>
      <h4 className="p-3 text-center">NotificationPage</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" style={{cursor:"pointer"}} onClick={handleMarkAllRead}>Mark All Read</h4>
          </div>
          {user?.notification.map((notificationMgs)=>(
            <div className="card p-2 mt-2" style={{cursor:"pointer"}}>

              <div className="card-text" onClick={()=>{
                navigate(notificationMgs.onclickPath)
              }}>{notificationMgs.message}</div>
            </div>
          ))}

        </Tabs.TabPane>
    
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2 text-primary" style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>Delete All Read</h4>
          </div>
          {user?.seennotification.map((notificationMgs)=>(
            <div className="card p-2 mt-2" style={{cursor:"pointer"}}>

              <div className="card-text" onClick={()=>{
                navigate(notificationMgs.onclickPath)
              }}>{notificationMgs.message}</div>
            </div>
          ))}
          {/* {user?.notification.map(notificationMgs=>(
            <div className="card">
<div className="card-text">

</div>
            </div>
          ))} */}
        </Tabs.TabPane>
      </Tabs>
      </Layout>
  )
}

export default NotificationPage