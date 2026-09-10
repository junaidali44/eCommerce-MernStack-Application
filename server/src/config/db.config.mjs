import mongoose from "mongoose";

const connectDB = async ()=>{
    const DB_NAME = "ecommerce_db"
try{
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDb connected successfully to: ${connect.connection.host} and Using db : ${connect.connection.name}`);
    
}
catch(error){
    console.error("Error connecting to MongoDB:", error);
}}

export default connectDB;