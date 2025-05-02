import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { UserInfoPage } from './pages/UserInfoPage';
import PrivateRoutes from './auth/PrivateRoute';
import PleaseVirifiedEmailPage from './pages/PleaseVerifiedEmailPage';
import EmailVerificationLandingPage from './pages/EmailVerification/EmailVerificationLandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PasswordResetLandingPage from './pages/PasswordResetLanding/PasswordResetLandingPage';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoutes><UserInfoPage /></PrivateRoutes>} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/verify-email" element={<PleaseVirifiedEmailPage />} />
                <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandingPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};
