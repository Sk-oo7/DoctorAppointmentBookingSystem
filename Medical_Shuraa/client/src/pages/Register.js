import React from 'react'
import {Button, Form, Input,message} from 'antd'
import {useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import { Link,useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios"

function Register() {
  const dispatch=useDispatch()

  const navigate=useNavigate()
  const onFinish=async(values)=>{
try{
  dispatch(showLoading())
const response=await axios.post("/api/user/register",values);
dispatch(hideLoading())

if(response.data.success){
  navigate('/login')
  // message.success('Register Successfully')
  toast.success(response.data.message);
}
else{
  // message.error(response.data.message)
  toast.error(response.data.message)
}
}
catch(error){
  dispatch(hideLoading())
  console.log(error)
  toast.error("Something went wrong",error)

}
  }
  return (
    <div className='authentication'>
<div className='authentication-form card p-3'>
<h1 className='card-title'>Nice To Meet U</h1>
<Form layout='vertical' onFinish={onFinish}>
  <Form.Item label='Name' name='name'>
    <Input placeholder='Name'/>
  </Form.Item>
  <Form.Item label='Email' name='email'>
    <Input placeholder='Email'/>
  </Form.Item>
  <Form.Item label='Password' name='password'>
    <Input placeholder='Password' type='password'/>
  </Form.Item>
  <Button className='primary-button my-2' htmlType='submit'>REGISTER</Button>
  <Link to='/login' className='anchor mt-2'>CLICK HERE TO LOGIN</Link>
</Form>
</div>

    </div>
  )
}

export default Register