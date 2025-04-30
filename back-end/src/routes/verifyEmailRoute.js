import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body; // Get the verification string from the URL
        const db = await getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ verificationString });

        if (!user) {
            return res.status(404).json({ message: 'The email verification code is incorrect.' });
        }

        // Update the user's isValidated field to true and remove the verificationString
        await db.collection('users').updateOne(
            { _id: ObjectId(user._id) },
            { $set: { isValidated: true }, 
            // $unset: { verificationString: "" } 
        }
        );

        // Generate a new JWT token for the user
        jwt.sign(
            { id: user._id, email: user.email, info: user.info, isValidated: true },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error generating token', err });
                }
                res.status(200).json({ token });
            }
        );
    }
}