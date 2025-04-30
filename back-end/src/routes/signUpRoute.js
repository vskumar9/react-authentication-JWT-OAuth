import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../util/sendEmail.js';

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

        const verificationString = uuidv4(); // Generate a unique verification token

        const newUser = {
            favoriteFood: '',
            hairColor: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            info: newUser,
            isValidated: false,
            verificationString, // Store the verification token in the database
        });


        try {
            await sendEmail({
                to: email, 
                from: 'vaddisanjeevkumar9676@gmail.com', 
                subject: 'Email Verification', 
                text: `Please verify your email by clicking on the following link: http://localhost:3000/verify-email/${verificationString}`, 
                html: `<p>Please verify your email by clicking on the following link:</p><a href="http://localhost:3000/verify-email/${verificationString}">Verify Email</a>`
            });
        } catch (error) {
            
        }

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
