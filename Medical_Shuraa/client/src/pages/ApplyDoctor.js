import React from 'react'
import Layout from '../components/Layout'
import { Col,Form,Input, Row, TimePicker,message } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {showLoading, hideLoading} from "../redux/features/alertSlice"
import axios from 'axios'
// import moment from 'moment'


function ApplyDoctor() {

  const {user}=useSelector(state=> state.user)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleFinish=async(values)=>{

try{
dispatch(showLoading())
const res=await axios.post('/api/user/apply-doctor', {...values,userId:user._id,
  timings:[
    values.timings[0].format('HH:mm'),
    values.timings[1].format('HH:mm')
    // moment(values.timings[0].format('HH:mm')),
    // moment(values.timings[1].format('HH:mm')),

  ]
},{
  headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`
  }

})
dispatch(hideLoading())
if(res.data.success){
  // console.log(values)
  
  message.success(res.data.message)
  navigate('/')
}
else{
  message.error(res.data.success)
}
}
catch(error){
  dispatch(hideLoading)
  console.log(error)
message.error('Something went wrong')
}
  }
  return (
    <Layout>
      <h2 className='text-center'>Apply Doctor</h2>
      <Form layout="vertical" onFinish={handleFinish} className="m-3"  
       >
      <h4 className=''>Personal Details : </h4>
        <Row gutter={20} >
          <Col xs={24} md={24} lg={8}>
          <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
            <Input type="text" placeholder="your first name"/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
          <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
            <Input type="text" placeholder="your last name"/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
          <Form.Item label="Phone No." name="phone" required rules={[{required:true}]}>
            <Input type="text" placeholder="your phone no."/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
          <Form.Item label="Email" name="email" required rules={[{required:true}]}>
            <Input type="text" placeholder="your email"/>
            </Form.Item>
            </Col> <Col xs={24} md={24} lg={8}>
          <Form.Item label="Website" name="website" required rules={[{required:true}]}>
            <Input type="text" placeholder="your website"/>
            </Form.Item>
            </Col> <Col xs={24} md={24} lg={8}>
          <Form.Item label="Address" name="address" required rules={[{required:true}]}>
            <Input type="text" placeholder="your clinic address"/>
            </Form.Item>
            </Col>
        </Row>
        <h4 className='mt-4'>Professional Details : </h4>
        <Row gutter={20} >
          <Col xs={24} md={24} lg={8}>
          <Form.Item label="Specialisation" name="specialisation" required rules={[{required:true}]}>
            <Input type="text" placeholder="your specialisation"/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
          <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
            <Input type="text" placeholder="your experience"/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
          <Form.Item label="Fees Per Consultation" name="feesPerCunsaltation" required rules={[{required:true}]}>
            <Input type="text" placeholder="your consultation fee"/>
            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
          <Form.Item label="Timing" name="timings" required rules={[{required:true}]} >
            <TimePicker.RangePicker format='HH:mm'/>

            </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
            <button className='btn btn-primary form-btn' type="submit">
            Submit
          </button>
            </Col>
           
        </Row>
        
      </Form>
    </Layout>
  )
}

export default ApplyDoctor