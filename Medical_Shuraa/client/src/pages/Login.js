import React from 'react'
import {Button, Form, Input, message} from 'antd'
import {useDispatch } from 'react-redux'
import { showLoading,hideLoading} from '../redux/features/alertSlice'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
// import toast from "react-hot-toast"

function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onFinish=async(values)=>{
try{
  dispatch(showLoading())
const res=await axios.post("/api/user/login",values);
dispatch(hideLoading())
if(res.data.success){
  localStorage.setItem("token",res.data.token);
  message.success(res.data.message);

  // message.success("Login Successfully");
  navigate("/")
    window.location.reload()

}
}
catch(error){
  dispatch(hideLoading())
console.log(error)
message.error('Something went wrong')
}
  }
  return (
    <div className='authentication'>
<div className='authentication-form card p-3'>
<h1 className='card-title'>Welcome Back</h1>
<Form layout='vertical' onFinish={onFinish}>
  
  <Form.Item label='Email' name='email'>
    <Input placeholder='Email'/>
  </Form.Item>
  <Form.Item label='Password' name='password'>
    <Input placeholder='Password' type='password'/>
  </Form.Item>
  <Button className='primary-button my-2' htmlType='submit'>Login</Button>
  <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
</Form>
</div>

    </div>
  )
}

export default Login