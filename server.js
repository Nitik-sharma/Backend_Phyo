import express from "express"
import cors from 'cors'
import dotenv from "dotenv";

import connectDB from "./src/config/db.js"
import appointmentRoutes from './src/routes/appointmentRoutes.js'

dotenv.config();

const app = express()
connectDB()



console.log("MAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);
console.log("DOCTOR_EMAIL",process.env.DOCTOR_EMAIL)
app.use(cors())
app.use(express.json())
app.use("/api/appointments", appointmentRoutes);


let PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})
