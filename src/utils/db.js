import mongoose from "mongoose"

export const connectDB=async()=>{
    try {

        const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected succesfully,${conn.connection.host}`)

        
    } catch (error) {


        console.log(`error in mongodb connection,${error.message}`)
        process.exit(1)
        
    }
}