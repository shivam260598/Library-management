import React, { useEffect, useState } from 'react';
import './styles.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const UserDetails = ({ user }) => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
    
            console.log('User logged out successfully!');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };
  
    return (
        <div className="user-details">
            <h3>User Details</h3>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

const Login = () => {
    const [currentPage, setCurrentPage] = useState('login');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user); else setUser(null);

            setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);
    
        if (loading) return 'loading...';

    if (user) return <UserDetails user={user} />;

    return (
        <div className="login_container">
            <div className="login_card">
                {currentPage === "login" ? (
                    <LoginForm setCurrentPage={setCurrentPage} />
                ) : (
                    <SignupForm setCurrentPage={setCurrentPage} />
                )}
            </div>
        </div>
    );
};

export default Login;
