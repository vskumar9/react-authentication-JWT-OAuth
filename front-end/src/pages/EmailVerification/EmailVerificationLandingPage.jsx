import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useToken from '../../auth/useToken.jsx'
import EmailVerificationSuccessPage from './EmailVerificationSuccessPage.jsx'
import EmailVerificationFailPage from './EmailVerificationFailPage.jsx'

const EmailVerificationLandingPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const { verificationString } = useParams();
    const [, setToken] = useToken();

    useEffect(() => {
        const loadVerification = async () => {
            try {
                const response = await axios.put('/api/verify-email', { verificationString });
                const { token } = response.data;
                setToken(token); 
                setIsLoading(false);
                setIsSuccess(true);
            } catch (error) {
                setIsSuccess(false);
                setIsLoading(false);
                if (error.response) {
                    console.error('Error verifying email:', error.response.status, error.response.data);
                } else {
                    console.error('Network or other error:', error.message);
                }
            }
        }
        loadVerification();
    }, [setToken, verificationString]);

    if(isLoading) return <div>Loading...</div>;
    if(isSuccess) return <EmailVerificationSuccessPage />;
    return <EmailVerificationFailPage />;
}

export default EmailVerificationLandingPage
