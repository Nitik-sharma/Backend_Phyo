import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("mongosse connect sucessfully")

    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB