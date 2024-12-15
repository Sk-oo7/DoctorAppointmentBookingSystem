import Layout from '../components/Layout'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { DatePicker, TimePicker,message } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from "../redux/features/alertSlice"
import toast from "react-hot-toast"

const BookingPage = () => {
  const {user}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const params=useParams()
  const [doctors,setDoctors]=useState(null)
  const [date,setDate]=useState();
  const [time,setTime]=useState()
  const dispatch=useDispatch()
  const [isAvailability,setIsAvailability]=useState(false)
const getUserData=async()=>{
  try{
const res =await axios.post( "/api/doctor/getDoctorById",{doctorId: params.doctorId},{
headers:{
  Authorization: `Bearer ${localStorage.getItem("token")}`
}
}
);
if(res.data.success){
  setDoctors(res.data.data)
}
  }
  catch(error){
     
    toast.error("Error getting doctor by id")

  }
}

const handleBooking=async()=>{
  setIsAvailability(false)

try{
  if(!date && !time){
    return alert("Date & Time Required")
  }
dispatch(showLoading())
const res=await axios.post("/api/user/book-appointment",
{
  doctorId:params.doctorId,
  userId:user._id,
  doctorInfo:doctors,
date:date,
userInfo:user,
time:time,
},
{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
}
)
dispatch(hideLoading())
if(res.data.success){
  message.success(res.data.message)
  navigate("/appointments")
}
}
catch(error){
dispatch(hideLoading)
console.log(error)
}
}
const handleAvailability=async()=>{
  try{
// dispatch(showLoading())
const res=await axios.post('/api/user/booking-availability',
{doctorId:params.doctorId,date,time},
{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }
}
)
dispatch(hideLoading())
if(res.data.success){
  message.success(res.data.message)
  
  setIsAvailability(true)

}
else{
  toast.error(res.data.message)
}
  }
  catch(error){
    toast.error("Error booking appointment")
    dispatch(hideLoading())
    
  }
}

useEffect(()=>{
  
  getUserData();
},[])
  return (
    <Layout>
      <h1 className='text-center m-3'>BookingPage</h1>
    <div className='container m-2'>
      {doctors && (
        <div>
          <h1 className='page-title'>Dr. {doctors.firstName} {doctors.lastName}</h1>
<h4 >Timings : {doctors.timings && doctors.timings[0]} - {" "}
{ doctors.timings && doctors.timings[1]}{" "}
</h4>
<h4>Phone Number : {doctors.phone}</h4>
<h4>Address : {doctors.address}</h4>
<h4>Fees per Visit : {doctors.feesPerCunsaltation}</h4>
<h4>Website : {doctors.website}</h4>


<div className='d-flex flex-column w-50 '>
<DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value)=>{
  setIsAvailability(false)

  setDate(value.format("DD-MM-YYYY"))
}}

  />
  <TimePicker 
  className='m-2' 
  format="HH:mm" 
  onChange={(value) => {
    setIsAvailability(false);
    setTime(value.format("HH:mm"))

    
  // setTime(value.format("HH:mm"))
}} 
/>

{!isAvailability && (
  <button className='btn btn-primary mt-2' onClick={handleAvailability}>
  Check Availability
  
</button>
)}


{isAvailability && (
  <button className='btn btn-dark mt-2' onClick={handleBooking}>
  Book Now
</button>
)}
</div>
        </div>

      )}
    </div>
    </Layout>
  )
}

export default BookingPage