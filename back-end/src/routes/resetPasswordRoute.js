import bcrypt from 'bcrypt';
import { getDbConnection } from '../db.js';

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        console.log('Password reset attempt:', {
            code: req.params.passwordResetCode,
            body: req.body
          });          

        try {

            const db = getDbConnection('react-auth-db');

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            const result = await db.collection('users').findOneAndUpdate(
                { passwordResetCode },
                { $set: { password: hashedPassword } , $unset: { passwordResetCode: "" }}
            );

            if(result.lastErrorObject.n === 0) {
                return res.status(404).json({ message: 'Invalid password reset code.' });
            }
            res.status(200).json({ message: 'Password has been successfully reset.' });

        } catch (error) {
            console.error('Error resetting password:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}