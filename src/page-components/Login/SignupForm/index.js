import React, { useState } from 'react';
import './styles.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase';

const Signup = ({ setCurrentPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
    
            console.log('User signed up successfully!');
        } catch (error) {
            setError(error.message);
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>SIGN UP</h2>
            <form>
            <label htmlFor="email">Full Name:</label>
                <input
                    type="text"
                    id="full_name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError(null);
                    }}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                    }}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                    }}
                />

                <button type="button" onClick={handleSignup}>
                    Sign Up
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="login-link">
                <p>
                    Already a user?{' '}
                    <span
                        className="login_redirect"
                        onClick={() => setCurrentPage('login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
