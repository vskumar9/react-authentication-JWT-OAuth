import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';

export const logInRoute = { 
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = await getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.sendStatus(401); // Unauthorized: User not found
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.sendStatus(401); // Unauthorized: Invalid password
        }

        jwt.sign(
            { id: user._id, email, info: user.info, isValidated: user.isValidated },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error logging in', err });
                }
                // res.status(200).json({ token, user: { email, info: user.info, isValidated: user.isValidated } });
                res.status(200).json({ token });
            }
        );
    },


}