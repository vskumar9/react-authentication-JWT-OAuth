import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { UserInfoPage } from './pages/UserInfoPage';
import PrivateRoutes from './auth/PrivateRoute';
import PleaseVirifiedEmailPage from './pages/PleaseVirifiedEmailPage';
import EmailVerificationLandingPage from './pages/EmailVerificationLandingPage';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoutes><UserInfoPage /></PrivateRoutes>} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/verify-email" element={<PleaseVirifiedEmailPage />} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};
