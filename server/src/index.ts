import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Desk';
import cors from 'cors';
import fileUpload from 'express-fileupload';
const PORT = 5000;

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
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
app.use('/api', require('./routers/upload'));
//Connect to mongoAtals
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening to port ${PORT}`);
  app.listen(PORT);
});
