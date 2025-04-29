import { useState, React } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const OnSignUpClicked = async () => {
        alert('Log in functionality not implemented yet');
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
        console.log('Logging in with:', email, password);
        // Simulate a successful login
        setTimeout(() => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate('/home'); // Redirect to home page on success
            }, 3000);
        }, 1000);
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
          }}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Already have an account? Log In</button>
    </div>
  )
}

export default SignUpPage
