import express from "express"
import cors from 'cors'
import dotenv from "dotenv";

import connectDB from "./src/config/db.js"
import appointmentRoutes from './src/routes/appointmentRoutes.js'
import contactRoute from './src/routes/contactRoutes.js'

dotenv.config();

const app = express()
connectDB()



console.log("MAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);
console.log("DOCTOR_EMAIL",process.env.DOCTOR_EMAIL)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://phyo-4n2f.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json())
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact",contactRoute)


let PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})
