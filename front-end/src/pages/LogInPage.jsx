import { useState, React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useToken from '../auth/useToken.jsx'
import { useQueryParams } from '../util/useQueryParams'



const LogInPage = () => {

    const navigate = useNavigate();
    const [ , setToken ] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams(); // Get the token from the URL

    useEffect(() => {
      if (oauthToken) {
        setToken(oauthToken); // Store the token in local storage
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
        navigate('/'); // Redirect to home page on success
      }
    }, [oauthToken, setToken, navigate]);

    useEffect(() => {
      const loadOauthUrl = async () => {
        try {
          const response = await axios.get('/auth/google/url');
          setGoogleOauthUrl(response.data.url);
        } catch (error) {
          console.error('Error fetching Google OAuth URL:', error);
        }
      }
      loadOauthUrl();
    }, []);

    const OnLogInClicked = async () => {
        // alert('Log in functionality not implemented yet');
        try{

          const response = await axios.post('/api/login', {
              email: email,
              password: password
          });
  
          const { token } = response.data;
          setToken(token); // Store the token in local storage
          navigate('/'); // Redirect to home page on success
        }
        catch (error) {
            console.error('Error logging in:', error);
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000);
        }
    }

  return (
    <div className='content-container'>
        <h1>Log In</h1>
        {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't log you in. {showErrorMessage}</div>}
        {showSuccessMessage && <div className="success">Successfully logged in! {showSuccessMessage}</div>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" placeholder="someone@gmail.com"/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder="password"/>
        <hr />
        <button disabled= {!password || !email} onClick={() => {
          OnLogInClicked()
          setEmail(''); 
          setPassword(''); 
          }}>Log In</button>
        <button onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
        <button onClick={() => navigate('/sign-up')}>Don't have an account? Sign Up</button>
        <button disabled = {!googleOauthUrl} onClick={()=> window.location.href = googleOauthUrl}>Log in  with Google</button>
    </div>
  )
}

export default LogInPage
