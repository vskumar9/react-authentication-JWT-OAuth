import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail.js';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;
        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();
        const { result } = await db.collection('users').updateOne(
            { email },
            { $set: { passwordResetCode } }
        );
        if (result.nModified > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'vaddisanjeevkumar9676@gmail.com',
                    subject: 'Password Reset Request',
                    text: `Click the link to reset your password: http://localhost:3000/reset-password/${passwordResetCode}`,
                    html: `<p>Click the link to reset your password: <a href="http://localhost:3000/reset-password/${passwordResetCode}">Reset Password</a></p>`
                });
            } catch (error) {
                Console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }
        }
        return res.status(200).json({ message: 'Password reset link sent' });
    }
}