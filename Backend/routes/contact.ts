import express, { Request, Response } from 'express';
import Contact from '../models/Contact';
import EmailService from '../services/emailService';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req: Request, res: Response) => {
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
    const newContact = new Contact({
      email,
      message
    });

    await newContact.save();

    // Send email notification
    const emailService = new EmailService();
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

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

export default router;
