process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { sendEmail } from '../util/sendEmail.js';

export const testEmailRoute = {
    path: '/api/test-email', 
    method: 'post',          
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'www.vskumar6343@gmail.com',
                from: 'vaddisanjeevkumar9676@gmail.com',
                subject: 'Test Email',
                text: 'This is a test email',
                html: '<strong>This is a test email</strong>',
            });
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error in testEmailRoute:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};
