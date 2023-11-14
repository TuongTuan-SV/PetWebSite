import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
const cookieParser = require('cookie-parser');
const PORT = 5000;

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://127.0.0.1:5173'], credentials: true }));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//Routes
//User
app.use('/user', require('./routers/userRouter'));
//Product
app.use('/api', require('./routers/productRoutes'));
app.use('/api', require('./routers/brandRouter'));
app.use('/api', require('./routers/carouselRouter'));
app.use('/api', require('./routers/upload'));
app.use('/api', require('./routers/categoryRouter'));
app.use('/api', require('./routers/OrderRouter'));
app.use('/api', require('./routers/blogRouter'));
//Connect to mongoAtals
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening to port ${PORT}`);
  app.listen(PORT);
});
