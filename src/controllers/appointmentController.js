
import { v4 as uuidv4 } from "uuid";
import Appointment from "../models/Appointment.js";
import sendEmail from "../utils/sendEmail.js";

export const bookAppointment = async (req, res) => {
    try {
        const { patientName, patientEmail, patientPhone, date, slot, notes } = req.body
        
        const token = uuidv4()
        const appointment = await Appointment.create({
            patientName,
            patientEmail,
            patientPhone,
            date,
            slot,
            notes,
            token
        })

         const approveLink = `${process.env.BASE_URL}/api/appointments/approve/${token}`;
        const cancelLink = `${process.env.BASE_URL}/api/appointments/cancel/${token}`;
        
        // Doctor mail

        const doctorHTML = `
        <h2> New Appointment Request</h2>
        <p>Name:${patientName}</p>
        <p>Email:${patientEmail}</p>
        <p>Phone:${patientPhone}</p>
        <p>Date:${date}</p>
        <p>Slot:${slot}</p>
       <br/>

       <a href="${approveLink}" style="padding:10px 20px;background:green;color:white;text-decoration:none;">Approve</a>
        <a href="${cancelLink}" style="padding:10px 20px;background:red;color:white;text-decoration:none;">Cancel</a>




        `


        await sendEmail(process.env.DOCTOR_EMAIL, "New Appointment", doctorHTML);

        //patient mail
        
        await sendEmail(
            patientEmail,
            "Appointment Request Received",
      `<p>Your appointment request has been received. Doctor will review it shortly.</p>`
        )

         res.json({
      success: true,
      message: "Appointment request submitted successfully",
    });

    } catch (error) {
         console.log(error);
         res.status(500).json({ message: "Server error" });
    }
}




export const approveAppointment = async (req, res) => {
  const { token } = req.params;

  const appointment = await Appointment.findOne({ token });

  if (!appointment) return res.send("Invalid request");

  appointment.status = "approved";
  await appointment.save();

  await sendEmail(
    appointment.patientEmail,
    "Appointment Approved",
    `<h2>Your appointment has been approved</h2>
     <p>Date: ${appointment.date}</p>
     <p>Slot: ${appointment.slot}</p>`
  );

  res.send("Appointment Approved Successfully");
};


export const cancelAppointment = async (req, res) => {
  const { token } = req.params;

  const appointment = await Appointment.findOne({ token });

  if (!appointment) return res.send("Invalid request");

  appointment.status = "cancelled";
  await appointment.save();

  await sendEmail(
    appointment.patientEmail,
    "Appointment Cancelled",
    `<h2>Your appointment has been cancelled by the doctor</h2>`
  );

  res.send("Appointment Cancelled");
};