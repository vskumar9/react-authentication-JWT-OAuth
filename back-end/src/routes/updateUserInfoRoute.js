import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db.js';
import { ObjectId } from 'mongodb';

export const updateUserInfoRoute = {   
    path: '/api/user/update/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;
        const { favoriteFood, hairColor, bio } = req.body;

        if (!authorization) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Unauthorized' });

            const { id, isValidated } = decoded;
            if (id !== userId) return res.status(403).json({ message: 'Forbidden' });

            if (!isValidated) return res.status(403).json({ message: 'Forbidden' });

            const db = await getDbConnection('react-auth-db');

            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectId(userId) },
                {
                    $set: {
                        'info.favoriteFood': favoriteFood,
                        'info.hairColor': hairColor,
                        'info.bio': bio,
                    }
                },
                { returnDocument: 'after' }
            );

            const { email, info } = result.value;

            jwt.sign(
                { id, email, isVerified, info },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION },
                (err, newToken) => {
                    if (err) return res.status(500).json({ message: 'Error creating token' });
                    res.status(200).json({ token: newToken });
                }
            );
        });
    }
}
