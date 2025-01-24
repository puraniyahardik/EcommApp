import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinar.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

//app config
const app = express();
const PORT = process.env.PORT || 4000;

//connection 
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());//using abackend any IP


//API Endpoints

app.get('/',(req,res)=>{
    res.send("APi Working");
})

//get the data from user routes file
app.use('/api/user',userRouter);

//get the product from these routes
app.use('/api/product',productRouter);


//acrt details
app.use('/api/cart',cartRoutes);

//order api's
app.use('/api/order',orderRoutes);


app.listen(PORT,()=>{
    console.log(`Server started on http:localhost/${PORT}`);  
})
