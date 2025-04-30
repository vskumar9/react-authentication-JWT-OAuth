import { useState, React } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useToken from '../auth/useToken.jsx'


const SignUpPage = () => {

    const navigate = useNavigate();
    const [, setToken] = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const OnSignUpClicked = async () => {
      try{
        const response = await axios.post('/api/signup', {
            email: email,
            password: password
        });
        if (response.status === 200) {
            const { token } = response.data;
            setToken(token); // Store the token in local storage
            setShowSuccessMessage(true);
            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 10000);
            navigate('/verify-email'); // Redirect to home page on success
        }
        else if (response.status === 400) {
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000);
          }
      }
      catch (error) {
        console.error('Error signing up:', error);
        setShowErrorMessage(true);
        setTimeout(() => {
            setShowErrorMessage(false);
        }, 5000);
      }
      
      {
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
        // Simulate a successful login
        // setTimeout(() => {
        //     setShowSuccessMessage(true);
        //     setTimeout(() => {
        //         setShowSuccessMessage(false);
        //         navigate('/'); // Redirect to home page on success
        //     }, 3000);
        // }, 1000);
      }

    }

  return (
    <div className='content-container'>
        <h1>Sign Up</h1>
        {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't log you in. {showErrorMessage}</div>}
        {showSuccessMessage && <div className="success">Successfully logged in! {showSuccessMessage}</div>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" placeholder="someone@gmail.com"/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder="password"/>
        <input type="password" value={Confirmpassword} onChange={e => setConfirmPassword(e.target.value)} name="password" id="password" placeholder="password"/>
        <hr />
        <button disabled= {!password || !email || password !== Confirmpassword} onClick={() => {
          OnSignUpClicked()
          setEmail(''); // Clear email input after login attempt
          setPassword(''); // Clear password input after login attempt
          setConfirmPassword(''); // Clear password input after login attempt
          }}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Already have an account? Log In</button>
    </div>
  )
}

export default SignUpPage
