import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser';
import { updateOrCreateGoogleOauth } from '../util/updateOrCreateGoogleOauth';

export const googleOauthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ error: 'Code not provided' });
        }

        try {
            const googleUser = await getGoogleUser({ code });
            console.log("googleUser:", googleUser);

            const updatedUser = await updateOrCreateGoogleOauth({ oauthUserInfo: googleUser });

            if (!updatedUser) {
                return res.status(500).json({ error: 'Failed to create or update user' });
            }

            const { _id: id, isValidated, email, info } = updatedUser;

            const token = jwt.sign(
                { id, isValidated, email, info },
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRATION }
            );

            res.cookie('token', token, { httpOnly: true });
            res.redirect(`http://localhost:3000/login?token=${token}`);

        } catch (error) {
            console.error('Error during Google OAuth callback:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
