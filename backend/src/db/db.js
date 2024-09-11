import mongoose from "mongoose"
import "dotenv/config"

const connectDB = async () => {
    try {
        // mongoose.connect(MONGODB_URI): function to connect to database, returns promise
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\nMongoDB connected succesfully at DB host = ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log(`\nMongoDB connection failed\n`, error)
        process.exit(1)
    }
}

export default connectDB