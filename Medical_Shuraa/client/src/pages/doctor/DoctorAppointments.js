import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table,message } from 'antd'
const DoctorAppointments = () => {
  const [appointments,setAppointments]=useState([])
 
  const getAppointments=async()=>{
    try{
      const res=await axios.get("/api/doctor/doctor-appointments",{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
      })
      if(res.data.success){
        setAppointments(res.data.data)
      }
    }
    catch(error){
console.log(error)
    }
  }
  useEffect(()=>{
    getAppointments()
  },[])

  const handleStatus=async(record,status)=>{
    // console.log(record._id)
    try{
const res=await axios.post('/api/doctor/update-status',{appointmentsId:record._id,status},
{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
})
if(res.data.success){
  // console.log(res.data.data)
  message.success(res.data.message)
  getAppointments()
}
    }
    catch(error){
      console.log(error)
      message.error("Something Went Wrong")
    }
  }
 
  
  const columns =[
    {
      title:"ID",
      dataIndex:"_id"
    },
    {
      title:"Patient",
      // dataIndex:"name",
      render:(text,record)=>(
        
        <span>
          {record.userInfo.name} 
        </span>
      )
    },
    {
      title:"Email id",
      dataIndex:"name",
      render:(text,record)=>(
        <span>

          {record.userInfo.email} 
        </span>
      )
    },
   
    {
      title:"Date & Time",
      dataIndex:"date",
      render:(text,record)=>{
        
       return <span>
        
{moment(record.date).format("DD-MM-YYYY")} &nbsp;
{(moment(moment.utc(record.time).format("HH:mm"),'HH:mm')).format('h:mm A')}  
     

        </span>
      }
    },
    {
      title:"Status",
      dataIndex:"status"
    },
    {
      title:"Actions",
      // dataIndex:"actions",
      render:(text,record)=>(
        <div className='d-flex'>
          {record.status==="pending" && (
            <div className='d-flex'>
<button className='btn btn-success' onClick={()=>handleStatus(record,'approved')}>Approved</button>
<button className='btn btn-danger ms-2' onClick={()=>handleStatus(record,'reject')}>Reject</button>

            </div>
          )}
        </div>
      )
    }
  ]
  return (
    <Layout>
      <h1 className='text-center m-2'>Appointments</h1>
      <Table columns={columns} dataSource={appointments}/>
      
      </Layout>
  )
}

export default DoctorAppointments