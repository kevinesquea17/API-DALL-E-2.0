import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/database.js';
import DalleRouter from './routes/dalleRoutes.js'
import postRouter from './routes/postRoutes.js'

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}))

app.use('/api/posts', postRouter);
app.use('/api/dalle', DalleRouter)

const PORT = process.env.PORT || 3000;

try {
    connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    })
} catch (error) {
    console.log(error)
}

