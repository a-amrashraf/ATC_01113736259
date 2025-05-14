import express, {Application} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import connectDB from './config/DB'
import EventRoutes from './routes/Events'
import UserRoutes from './routes/User'


dotenv.config()

const app:Application = express();

app.use(express.json());
app.use(morgan("short"));

connectDB();

app.use("/api/Events", EventRoutes)
app.use("/api/User", UserRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});