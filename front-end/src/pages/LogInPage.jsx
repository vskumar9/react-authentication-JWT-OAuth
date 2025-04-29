import { useState, React } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useToken from '../auth/useToken.jsx'


const LogInPage = () => {

    const navigate = useNavigate();
    const [ token, setToken ] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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


        // setShowErrorMessage(true);
        // setShowErrorMessage("Uh oh... something went wrong and we couldn't log you in.");
        
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email, password }),
        // });
        // if (response.ok) {
        //     const data = await response.json();
        //     setShowSuccessMessage(true);
        //     setTimeout(() => {
        //         setShowSuccessMessage(false);
        //     }, 3000);
        //     navigate('/home'); // Redirect to home page on success
        // } else {
        //     const error = await response.json();
        //     alert(`Error: ${error.message}`);
        //     setShowSuccessMessage(false);
        // }
        // console.log('Logging in with:', email, password);
        // // Simulate a successful login
        // setTimeout(() => {
        //     setShowSuccessMessage(true);
        //     setTimeout(() => {
        //         setShowSuccessMessage(false);
        //         navigate('/home'); // Redirect to home page on success
        //     }, 3000);
        // }, 1000);
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
    </div>
  )
}

export default LogInPage
