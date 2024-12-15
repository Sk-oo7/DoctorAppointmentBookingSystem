const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");


const getDoctorInfoController=async(req,res)=>{
  try{
const doctor=await doctorModel.findOne({userId:req.body.userId})
res.status(201).send({
  success:true,
  message:"doctor data fetch success",
  data:doctor
})
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in Fetching Doctor Details",
      error
    })
  }

}

const updateProfileController=async(req,res)=>{
try{
const doctor=await doctorModel.findOneAndUpdate(
  {
    userId : req.body.userId
  },
  req.body
);
res.status(201).send({
  success:true,
  message:"Doctor Profile Updated",
  data:doctor
})
}
catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    message:"Doctor Profile Update issue",
    error
  })
}
}

const getDoctorByIdController=async(req,res)=>{
  try{
    const doctor=await doctorModel.findOne({_id:req.body.doctorId})
  res.status(200).send({
    success:true,
    message:"single doc info fetched",
    data:doctor
  })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"Error in single doctor info",
     
    })
  }
}


// const doctorAppointmentsController=async(req,res)=>{
//   try{
//     const doctor=await doctorModel.findOne({userId:req.body.userId})

//     const appointments=await appointmentModel.find({
//         doctorId:doctor._id
//       })
//     const userInfo = await userModel.findById(appointments[0].userId);
//     const responseData = {...userInfo.toObject(),...appointments[0].toObject()}
//     res.status(200).send({
//       success:true,
//       message:"Users Appointments Fetched Successfully",
//       data:responseData
//     })
//   }
//   catch(error){
//     console.log(error)
//   res.status(500).send({
//     success:false,
//     error,
//     message:"Error in Doc Appointments",
    
//   })
// }
// }
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};




const updateStatusController=async(req,res)=>{
try{
const {appointmentsId,status}=req.body

const appointments=await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
const user = await userModel.findOne({ _id: appointments.userId });

const notification=user.notification
notification.push({
  type:"status-updated",
  message:`Your Appointment Status has been  ${status}`,
onClickPath:"/doctor-appointments"

});
await user.save();
res.status(200).send({
  success:true,
  message:"Appointment Status Updated"
})

}
catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message:"Error in Doc Appointments",
   
  })
}
}

module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController,updateStatusController}