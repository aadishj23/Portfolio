"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        // Create transporter using environment variables
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail', // You can change this to other services like 'outlook', 'yahoo', etc.
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_APP_PASSWORD // Your email app password (not regular password)
            }
        });
    }
    async sendContactNotification(contactData) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send to yourself
                subject: `New Contact Form Message from ${contactData.email}`,
                html: this.generateContactEmailHTML(contactData),
                text: this.generateContactEmailText(contactData)
            };
            await this.transporter.sendMail(mailOptions);
            console.log('Contact notification email sent successfully');
            return true;
        }
        catch (error) {
            console.error('Error sending contact notification email:', error);
            return false;
        }
    }
    generateContactEmailHTML(contactData) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Message</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .message-box { background: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
          .footer { text-align: center; color: #6c757d; font-size: 14px; margin-top: 30px; }
          .highlight { color: #007bff; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Message</h2>
            <p>Someone has reached out through your portfolio website!</p>
          </div>
          
          <div class="message-box">
            <h3>Message Details:</h3>
            <p><strong>From:</strong> <span class="highlight">${contactData.email}</span></p>
            <p><strong>Time:</strong> ${new Date(contactData.createdAt).toLocaleString()}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="footer">
            <p>This message was sent from your portfolio contact form.</p>
            <p>You can reply directly to ${contactData.email} to respond.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    }
    generateContactEmailText(contactData) {
        return `
New Contact Form Message

From: ${contactData.email}
Time: ${new Date(contactData.createdAt).toLocaleString()}

Message:
${contactData.message}

---
This message was sent from your portfolio contact form.
You can reply directly to ${contactData.email} to respond.
    `;
    }
    // Test email service connection
    async testConnection() {
        try {
            await this.transporter.verify();
            console.log('Email service connection verified');
            return true;
        }
        catch (error) {
            console.error('Email service connection failed:', error);
            return false;
        }
    }
}
exports.default = EmailService;
//# sourceMappingURL=emailService.js.map