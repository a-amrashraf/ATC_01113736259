import express, {Application} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import connectDB from './config/DB'
import EventRoutes from './routes/Events'
import UserRoutes from './routes/User'
import BookingRoutes from './routes/Booking'



dotenv.config()

const app:Application = express();
const cors = require('cors');

app.use(express.json());
app.use(morgan("short"));
app.use(cors());

connectDB();

app.use("/events", EventRoutes)
app.use("/user", UserRoutes)
app.use("/booking", BookingRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});