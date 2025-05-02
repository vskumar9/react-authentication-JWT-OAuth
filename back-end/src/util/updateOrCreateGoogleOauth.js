import { getDbConnection } from "../db";

export const updateOrCreateGoogleOauth = async ({ oauthUserInfo }) => {
    if (!oauthUserInfo) {
        throw new Error("Missing 'oauthUserInfo' parameter.");
    }

    const { id: googleId, email, verified_email: isValidated } = oauthUserInfo;

    const db = await getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        await db.collection('users').updateOne(
            { email },
            { $set: { googleId, isValidated } }
        );
        return await db.collection('users').findOne({ email });
    } else {
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isValidated,
            info: {}
        });

        return await db.collection('users').findOne({ _id: result.insertedId });
    }
};
