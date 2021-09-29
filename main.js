import express from "express";
import path from "path";
import dotEnv from "dotenv";

dotEnv.config();

const app=express();
app.use(express.json({}));
app.use("/static",express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

