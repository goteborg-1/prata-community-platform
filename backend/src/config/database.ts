import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error(`Could not connect to MongoDB: ${error}`)
    process.exit(1)
  }
}

export default connectToDatabase