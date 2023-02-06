import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import Deck from './models/Desk'
import cors from 'cors'

const PORT = 5000

const app = express();

app.use(express.json())
app.use(cors())

app.use('/user', require('./routers/userRouter'))

// Request
app.get("/hello",(req: Request, res: Response) => {
    res.send("Hello Word")
})

app.post("/decks", async (req: Request, res: Response) => {

    const newDeck = new Deck({
        title : req.body.title
    });
    const createDeck = await newDeck.save();
    res.json(createDeck)
})

//Connect to mongoAtals
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening to port ${PORT}`)
    app.listen(PORT)
});



