/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';
import Table from '../../Table';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase';
import getCartList from './getCartList';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const getTotalAmount = (list) => {
	let amount = 0;
	(list || []).forEach((element) => {
		amount += element.price;
	});

	return amount;
};

function MyCart() {
	const [user, setUser] = useState(null);
	const [bookList, setBookList] = useState([]);
    const [authorNames, setAuthorNames] = useState({});
	const [cart, setCart] = useState([]);

	useEffect(() => {
        const auth = getAuth();
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user); else setUser(null);
        });
    
        return () => unsubscribe();
    }, []);

	const getData = useCallback(async () => {
        try {
            let q = query(collection(db, "books"));
      
            const querySnapshot = await getDocs(q);
            const temp = [];
      
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
            setBookList(temp);
        } catch (error) {
            console.log('Error in getData :: ', error);
        }
    }, []);

	const getAuthorName = async () => {
        try {
            const q = query(collection(db, "authors"));
            const querySnapshot = await getDocs(q);
            let temp = {};
            querySnapshot.forEach((doc) => {
                temp = { ...temp, [doc.id]: doc.data().name };
            });
            setAuthorNames(temp);
        } catch (error) {
            console.log('getAuthorNameError :: ', error);
        }
    };

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
            setCart(temp);
        } catch (error) {
            console.log('getAuthorNameError :: ', error);
        }
    };

	useEffect(() => {
		getData();
		getAuthorName();
		getCartData();
	}, [user]);

	const list = getCartList({ bookList, authorNames, cart });
	const total_amount = getTotalAmount(list);

	return (
		<div className="container">
			<div className="cart_body">
				<div className="shopping_card">
					<div className="shopping_card_header">
						Shopping Cart
					</div>
					<div className="table_container">
						<Table data={list} getCartData={getCartData} />
					</div>
					<div className="table_footer">
						<button
							themeType="secondary"
							onClick={() => window.location.href = '/books'}
						>
								Return to Store
						</button>
					</div>
				</div>

				<div className="right_cart">
					<div className="totals">
						<h2 className="heading_total">Cart Total</h2>

						<div className="total_section">
							<div className="total_amount">
								<span className="black" style={{ fontSize: 16 }}>Total</span>
								<span className="black">
									₹{' '}{total_amount}
								</span>
							</div>
							<button className="confirm_order">
									Confirm Order
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MyCart;
