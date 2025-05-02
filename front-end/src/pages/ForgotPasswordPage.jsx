import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async () => {
        try {
            await axios.put(`/api/forgot-password/${email}`);
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            setErrorMessage("Failed to send reset link. Please try again.");
            console.error("Error sending reset link:", error);
        }
    }

  return Success ? (
    <div className="content-container">
      <h1>Success</h1>
      <p>Check your mail for a reset link</p>
    </div>
  ) : (
    <div className="content-container">
      <h1>Forgot Password</h1>
      <p>Enter your email and we'll send you a reset link</p>
      {errorMessage && <p className="fail">{errorMessage}</p>}
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="someone@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={!email} onClick={handleSubmit}>
        Send Reset Link
      </button>
      <button onClick={() => navigate("/login")}>
        Back to Login
      </button>

    </div>
  );
};

export default ForgotPasswordPage;
