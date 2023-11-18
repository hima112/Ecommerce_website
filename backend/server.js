import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {notFound,errorHandler} from "./middleware/notFound.js"
import connectDB from "./config/db.js";
const port=process.env.PORT||5000;

connectDB();

const app=express();

app.get('/', (req, res)=>{
    res.send("Api is running");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>console.log(`server running on port ${port}`));