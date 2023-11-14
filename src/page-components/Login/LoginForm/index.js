import React, { useState } from 'react';
import './styles.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const Login = ({ setCurrentPage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
          await signInWithEmailAndPassword(auth, username, password);

          console.log('User logged in successfully!');
        } catch (error) {
          setError(error.message);
          console.error('Error logging in:', error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>LOGIN</h2>

            <form>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
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
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <div className="login-link">
                <p>
                    Not a user yet?{' '}
                    <span
                        className="login_redirect"
                        onClick={() => setCurrentPage('signup')}
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
