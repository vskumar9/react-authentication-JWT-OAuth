import axios from 'axios';
import { oauth2Client } from './oauthClient';

const getAccessAndBearerTokenUrl = ({accessToken}) => `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`;
// const getAccessAndBearerTokenUrl = ({accessToken}) => `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

export const getGoogleUser = async ({code}) => {
    const { tokens } = await oauth2Client.getToken(code);
    const response = await axios.get(getAccessAndBearerTokenUrl({accessToken: tokens.access_token}), 
    {headers: {Authorization: `Bearer ${tokens.id_token}`}}
);

return response.data;

}