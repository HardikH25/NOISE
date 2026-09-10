import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import customerRouter from './routes/customer.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/customers', customerRouter)
mongoose.connect(process.env.dbURL).then(() => {
    console.log('DB Connected')
}).catch((error) => {
    console.log(error)
})


app.listen(8070, () => {
    console.log('Welcome to port 8070')
})