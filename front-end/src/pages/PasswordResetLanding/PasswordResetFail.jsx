import React from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordResetFail = () => {
    const navigate = useNavigate();
    return (
    <div className='content-container'>
      <h1>Uh oh...!</h1>
      <p>
        It seems like the password reset link you used is invalid or has expired. Please check your email for a new password reset link or contact support if you need further assistance.
      </p>
      <button onClick={() => navigate('/login')}>Log In page</button>
    </div>
  )
}

export default PasswordResetFail
