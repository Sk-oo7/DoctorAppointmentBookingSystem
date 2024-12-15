import React, { useLayoutEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(res);
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id"
    },
    {
      title: "Doctor",
      // dataIndex: "0 ",
      render: (text,record) => (
         <span>
          Dr. {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      )
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text,record) => (
          <span>
          {record.doctorInfo.phone}
        </span>
      )
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
         
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
         {(moment(moment.utc(record.time).format("HH:mm"),'HH:mm')).format('h:mm A')}  

         
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        return  <span>
          {status}
        </span>
      }

    }
  ]

  return (
    <Layout>
      <h1 className='text-center m-2'>Appointments</h1>
      <Table columns={columns} dataSource={appointments}/>
    </Layout>
  );
};

export default Appointments;
