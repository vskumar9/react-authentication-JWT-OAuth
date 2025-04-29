import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { UserInfoPage } from './pages/UserInfoPage';
import PrivateRoutes from './auth/PrivateRoute';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoutes><UserInfoPage /></PrivateRoutes>} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};
