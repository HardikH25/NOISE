import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import customerRouter from './routes/customer.routes.js';
import productRouter from './routes/product.routes.js';
import wishlistRouter from './routes/wishlist.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';
import newsletterRouter from './routes/newsletter.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'NOISE API', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Welcome to NOISE API Backend' });
});

app.use('/customers', customerRouter);
app.use('/products', productRouter);
app.use('/wishlist', wishlistRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/newsletter', newsletterRouter);

mongoose.connect(process.env.dbURL).then(() => {
    console.log('DB Connected successfully to MongoDB Atlas');
}).catch((error) => {
    console.error('Database connection error:', error);
});

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`NOISE Server running on port ${PORT}`);
});