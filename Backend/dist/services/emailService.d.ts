interface ContactFormData {
    email: string;
    message: string;
    createdAt: Date;
}
declare class EmailService {
    private transporter;
    constructor();
    sendContactNotification(contactData: ContactFormData): Promise<boolean>;
    private generateContactEmailHTML;
    private generateContactEmailText;
    testConnection(): Promise<boolean>;
}
export default EmailService;
//# sourceMappingURL=emailService.d.ts.map