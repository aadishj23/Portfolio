"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_1 = __importDefault(require("../models/Contact"));
const emailService_1 = __importDefault(require("../services/emailService"));
const router = express_1.default.Router();
// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
    try {
        const { email, message } = req.body;
        // Validation
        if (!email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Email and message are required'
            });
        }
        if (!email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }
        // Create new contact
        const newContact = new Contact_1.default({
            email,
            message
        });
        await newContact.save();
        // Send email notification
        const emailService = new emailService_1.default();
        const emailSent = await emailService.sendContactNotification({
            email: newContact.email,
            message: newContact.message,
            createdAt: newContact.createdAt
        });
        if (!emailSent) {
            console.warn('Contact saved but email notification failed to send');
        }
        res.status(201).json({
            success: true,
            message: 'Contact message sent successfully!',
            data: {
                id: newContact._id,
                email: newContact.email,
                createdAt: newContact.createdAt
            }
        });
    }
    catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});
// GET /api/contact - Get all contacts (for admin purposes)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact_1.default.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    }
    catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
// Test email service endpoint
router.post('/test-email', async (req, res) => {
    try {
        const emailService = new emailService_1.default();
        const connectionTest = await emailService.testConnection();
        if (connectionTest) {
            res.json({
                success: true,
                message: 'Email service connection successful'
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Email service connection failed'
            });
        }
    }
    catch (error) {
        console.error('Email service test error:', error);
        res.status(500).json({
            success: false,
            message: 'Email service test failed'
        });
    }
});
exports.default = router;
//# sourceMappingURL=contact.js.map