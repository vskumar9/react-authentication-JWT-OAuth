import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const PleaseVirifiedEmailPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000);
    }, [navigate]);


  return (
    <div className='content-container'>
        <h1>Thanks for Signing Up!</h1>
        <p>
            A verification email has been sent to your email address provided. 
            Please check your inbox and click on the verification link to activate your account.
        </p>
    </div>
  )
}

export default PleaseVirifiedEmailPage
