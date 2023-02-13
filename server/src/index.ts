import { config } from 'dotenv';
config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Desk';
import cors from 'cors';

const PORT = 5000;

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/user', require('./routers/userRouter'));

//Connect to mongoAtals
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening to port ${PORT}`);
  app.listen(PORT);
});
