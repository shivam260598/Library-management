/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './styles.css';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const BOOK_MANAGEMENT_NAVIGATION = {
    home: {
        title: 'Home',
        url: '/home',
    },
    books: {
        title: 'Books',
        url: '/books',
    },
    authors: {
        title: 'Authors',
        url: '/authors',
    },
    shopping_cart: {
        title: 'Shopping Cart',
        url: '/my-cart',
    },
    login: {
        title: 'Login',
        url: '/login',
    }
};

const Header = () => {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user); else setUser(null);
        });
    
        return () => unsubscribe();
    }, []);

    const getCartData = async () => {
        try {
            let q = query(collection(db, "user_cart"));
			q = query(q, where("status", "==", 'active'));
            q = query(q, where("user_id", "==", (user?.uid || '')));
            const querySnapshot = await getDocs(q);

            let temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({ id: doc.id, ...doc.data() });
            });
            if (Object.keys(temp).length > 0) {
                setCartCount(Object.keys(temp).length);
            }
        } catch (error) {
            console.log('getAuthorNameError :: ', error);
        }
    };

	useEffect(() => {
		getCartData();
	}, [user]);

    const currentUrl = window.location.href;

    return (
        <div className="header_container">
            <div className="header_title">
                Book Management
            </div>

            <div className="header_navs">
                {(Object.keys(BOOK_MANAGEMENT_NAVIGATION)).map((nav) => (
                    <div 
                        className={currentUrl.includes(BOOK_MANAGEMENT_NAVIGATION[nav].url) ? "navs active" : "navs"}
                        onClick={() => window.location.href = BOOK_MANAGEMENT_NAVIGATION[nav].url}
                    >
                        {BOOK_MANAGEMENT_NAVIGATION[nav].title}
                        {nav === 'shopping_cart' ? ` (${cartCount})` : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
