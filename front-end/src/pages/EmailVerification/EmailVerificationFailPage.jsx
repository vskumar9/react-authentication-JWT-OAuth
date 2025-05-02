import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmailVerificationFailPage = () => {
    const navigate = useNavigate();
    return (
    <div className='content-container'>
      <h1>Uh oh...!</h1>
      <p>
        Something went wrong and we couldn't verify your email. Please try again later.
      </p>
      <button onClick={() => navigate('/sign-up')}>Back to Sign Up</button>
    </div>
  )
}

export default EmailVerificationFailPage
