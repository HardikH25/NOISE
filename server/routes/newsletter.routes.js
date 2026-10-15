import express from 'express';
import SubscriberModel from '../models/subscriber.model.js';

const router = express.Router();

// @desc    Subscribe email to newsletter
// @route   POST /newsletter/subscribe
// @access  Public
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email address is required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Check if already subscribed
        const existing = await SubscriberModel.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(200).json({
                success: true,
                message: "You're already part of the Kult! Watch your inbox for drops."
            });
        }

        const subscriber = new SubscriberModel({ email: normalizedEmail });
        await subscriber.save();

        return res.status(201).json({
            success: true,
            message: "Welcome to the Kult. First access to limited drops is yours."
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to join. Please try again later."
        });
    }
});

export default router;
