import React from 'react'
import { useNavigate } from 'react-router-dom'


const PasswordResetSuccess = () => {

    const navigate = useNavigate();


    return (
    <div className='content-container'>
      <h1>Success!</h1>
      <p>
        Your password has been successfully reset. You can now log in with your new password.
      </p>
      <button onClick={() => navigate('/login')}>Log In page</button>
    </div>
  )
}

export default PasswordResetSuccess
