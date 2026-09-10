import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.config.mjs";
import authRouter from "./src/routes/auth.routes.mjs";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

connectDB();
app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to eCommerce API",
        description:"This API is develop using Nodejs and Expressjs",
        endpoints:{
            Register:"POST /api/auth/register",
            Login:"POST /api/auth/login",
            GetAllProducts:"GET /api/products",
        }
    });
})

app.use(`/api/auth`,authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});