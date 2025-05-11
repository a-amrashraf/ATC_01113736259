import express, {Application} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'



dotenv.config()

const app:Application = express();

app.use(express.json());
app.use(morgan("short"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});