import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
//App Config
const app = express();
const port= process.env.PORT || 4000;
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend client
    process.env.ADMIN_URL || 'http://localhost:5174'    // Admin client
  ];
const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
connectDB();
connectCloudinary();
//Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
//API Endpoints
app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
})
app.listen(port,()=>{console.log(`Server is running on port ${port}`)});