import express from 'express'
import { approveAppointment, bookAppointment, cancelAppointment } from '../controllers/appointmentController.js'


const router = express.Router()

router.post("/book", bookAppointment)
router.get("/approve/:token", approveAppointment)
router.get("/cancel/:token", cancelAppointment)

export default router