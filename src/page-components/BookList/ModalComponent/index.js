import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';
import Modal from '../../../Modal';
import { doc, setDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import generateRandomUid from '../../../utils/generateRandomUid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const CART_IMG_URL = 'https://i.pinimg.com/1200x/ba/e9/4e/bae94e8b8d71f1297c7db707df83a54e.jpg';
const TICK_ICON_SVG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEZYQ03_Chm5cbphQQNgJy_yrl-gwm9BuRWr_QXPR7IP02iS8UlDGxbKsWyht4lFeycdE&usqp=CAU';

const ModalComponent = ({ selectedBook, authorNames, setSelectedBook }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const auth = getAuth();
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user); else setUser(null);
        });
    
        return () => unsubscribe();
    }, []);

    const getCartData = useCallback(async () => {
        try {
            let q = query(collection(db, "user_cart"));
            q = query(q, where("status", "==", 'active'));
            q = query(q, where("book_id", "==", selectedBook.id));
            q = query(q, where("user_id", "==", (user?.uid || '')));
            const querySnapshot = await getDocs(q);
            
            let temp = {};
            querySnapshot.forEach((doc) => {
                temp = { ...temp, ...doc.data() };
            });

            if (Object.values(temp).includes(selectedBook?.id)) {
                setIsAdded(true);
            }
        } catch (error) {
            console.log('getCartData :: ', error);
        }
      }, [selectedBook.id, user?.uid])

    useEffect(() => {
        getCartData();
    }, [getCartData]);

    const onClickAddToCart = async (id) => {
        if (!user) {
            setError(true);
            return;
        }

        if (isAdded) return;
    
        try {
            const docData = {
                book_id: id,
                created_at: new Date(),
                status: 'active',
                user_id: user.uid,
            };
            
            const uid = generateRandomUid();
            await setDoc(doc(db, "user_cart", uid), docData);
    
            getCartData();
        } catch (error) {
            console.log('error :: ', error);
        }
    };

    return (
        <Modal isOpen={selectedBook} closeModal={() => setSelectedBook(null)}>
            <div className="modal_container">
                <img
                    src={selectedBook?.cover_page_url}
                    alt={selectedBook?.title}
                    width="50%"
                />

                <div className="details">
                    <div className="detail_header">DETAILS ABOUT THE BOOK :</div>
                    <div className="detail">
                        <span className="desc">Title: </span>{selectedBook.title}
                    </div>
                    <div className="detail">
                        <span className="desc">Author: </span>{authorNames?.[selectedBook.author_id] || ''}
                    </div>
                    <div className="detail">
                        <span className="desc">Description: </span>{selectedBook.description || '-'}
                    </div>
                    <div className="detail">
                        <span className="desc">Genre: </span>{selectedBook.genre}
                    </div>
                    <div className="detail">
                        <span className="desc">Price: </span>{selectedBook.price_currency} {selectedBook.price}
                    </div>

                    {!isAdded ? (
                        <button
                        className="add_to_cart"
                        onClick={() => onClickAddToCart(selectedBook?.id, isAdded)}
                        disabled={isAdded}
                        >
                            <img
                                src={CART_IMG_URL}
                                alt={selectedBook?.title}
                                width="20px"
                                height="20px"
                                style={{ marginRight: 8 }}
                            />
                            ADD TO CART
                        </button>
                    ) : (
                        <button className="added_to_cart" disabled={isAdded}>
                            <img
                                src={TICK_ICON_SVG}
                                alt={selectedBook?.title}
                                width="20px"
                                height="20px"
                                style={{ marginRight: 8 }}
                            />
                                    ALREADY ADDED TO CART
                        </button>
                    )}

                    {error ? 'kindly login to add to cart' : ''}
                </div>
            </div>
        </Modal>
    );
};

export default ModalComponent;
