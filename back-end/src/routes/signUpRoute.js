import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = await getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            return res.sendStatus(409); // Conflict: User already exists
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            hairColor: '',
            eyeColor: '',
            height: 0,
            favoriteFood: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            info: newUser,
            isValidated: false,
        });

        const { insertedId } = result; // Use insertedId instead of id
        jwt.sign(
            { id: insertedId, email, info: newUser, isValidated: false },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Error signing up', err });
                }
                res.status(200).json({ token });
            }
        );
    },
};
