import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import Deck from './models/Desk'

const PORT = 5000

const app = express();

app.use(express.json())

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
mongoose.connect(
    'mongodb+srv://admin:admin01@cluster0.inszf5n.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log(`Listening to port ${PORT}`)
    app.listen(PORT)
});



