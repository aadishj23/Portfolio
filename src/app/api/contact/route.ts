import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import EmailService from '@/lib/emailService';

// Mongoose + Resend need the Node.js runtime (not Edge).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    // Validation
    if (!email || !message) {
      return NextResponse.json(
        { success: false, message: 'Email and message are required' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create new contact
    const newContact = await Contact.create({ email, message });

    // Send email notification
    const emailService = new EmailService();
    const emailSent = await emailService.sendContactNotification({
      email: newContact.email,
      message: newContact.message,
      createdAt: newContact.createdAt,
    });

    if (!emailSent) {
      console.warn('Contact saved but email notification failed to send');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Contact message sent successfully!',
        data: {
          id: newContact._id,
          email: newContact.email,
          createdAt: newContact.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
