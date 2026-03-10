import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: String,
    patientEmail: String,
    patientPhone: String,
    date: String,
    slot: String,
    notes: String,
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },

    token: String,
}, {timestamps:true
    
}
)


export default mongoose.model("Appointment", appointmentSchema)
