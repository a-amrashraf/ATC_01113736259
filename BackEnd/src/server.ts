import express, {Application} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import connectDB from './config/DB'



dotenv.config()

const app:Application = express();

app.use(express.json());
app.use(morgan("short"));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});