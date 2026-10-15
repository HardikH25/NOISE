import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);
export default SubscriberModel;
