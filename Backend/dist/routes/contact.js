"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_1 = __importDefault(require("../models/Contact"));
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
exports.default = router;
//# sourceMappingURL=contact.js.map