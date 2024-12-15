const express = require("express");
const {registerController, loginController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentController} =require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const  router=express.Router()


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/getUserData",authMiddleware,authController)
router.post("/apply-doctor",authMiddleware,applyDoctorController)
router.post("/get-all-notification",authMiddleware,getAllNotificationController)
router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController)
router.get("/getAllDoctors",authMiddleware,getAllDoctorsController)
router.post("/book-appointment",authMiddleware,bookAppointmentController)
router.post("/booking-availability",authMiddleware,bookingAvailabilityController)
router.get("/user-appointments",authMiddleware,userAppointmentController)

module.exports = router;
 