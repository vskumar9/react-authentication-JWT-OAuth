import { React, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PasswordResetFail from "./PasswordResetFail";
import PasswordResetSuccess from "./PasswordResetSuccess";

const PasswordResetLandingPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const { passwordResetCode } = useParams();
  
  const onResetClick = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {newPassword: password});
      setIsSuccess(true);

    } catch (error) {
      setIsError(true);
      console.error("Error resetting password:", error);
    }
  }

  if (isError) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;
  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        disabled={!password || !confirmPassword || password !== confirmPassword}
        onClick={() => onResetClick()}
      >
        Reset Password
      </button>
    </div>
  );
};

export default PasswordResetLandingPage;
