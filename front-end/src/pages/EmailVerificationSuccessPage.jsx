import React from 'react'
import { useNavigate } from 'react-router-dom'


const EmailVerificationSuccessPage = () => {

    const navigate = useNavigate();


    return (
    <div className='content-container'>
      <h1>Success!</h1>
      <p>
        Thanks for verifying your email! You can now log in to your account.
      </p>
      <button onClick={() => navigate('/')}>Go to Home page</button>
    </div>
  )
}

export default EmailVerificationSuccessPage
