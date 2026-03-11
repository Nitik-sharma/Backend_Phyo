import Contact from "../models/Contact.js";
import sendEmail from "../utils/sendEmail.js";

export const sendContactMessage = async (req, res) => {
    try {
        const { name, email, phoneNo, message } = req.body;

        const newMessage = await Contact.create({
            name,
            email,
            phoneNo,
            message
        })

        const clinicHTML = `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phoneNo}</p>
      <p><b>Message:</b> ${message}</p>
    `;

        
        await sendEmail(process.env.DOCTOR_EMAIL, "New Contact Message", clinicHTML)
        res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });

    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Server error" });
    }
}