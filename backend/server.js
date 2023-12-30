import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import {notFound,errorHandler} from "./middleware/notFound.js"
import connectDB from "./config/db.js";
const port=process.env.PORT||5000;

connectDB();

const app=express();

// Body parser middlerware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie parser middlewear
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("Api is running");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res)=> res.send({clientId : process.env.PAYPAL_CLIENT_ID}))

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>console.log(`server running on port ${port}`));