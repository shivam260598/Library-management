import React from 'react';
import './styles.css';
import { db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';

const DELETE_BUTTON_ICON = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Delete-button.svg';

const Table = ({ data, getCartData }) => {
    const onClickDeleteIcon = async (id) => {
        try {
            const userCartDocRef = doc(db, 'user_cart', id);
            await updateDoc(userCartDocRef, { status: 'inactive' });

            getCartData();
            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document :: ', error);
        }
    };

    if ((data || []).length === 0) {
        return <div style={{ margin: 12 }}>Empty State...</div>;
    }

    return (
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>BOOKS</th>
                    <th>PRICE</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <div className="products">
					            <img src={item.cover_page_url} alt="" width="80px" height="80px" />
					            <div className="products_right">
                                    <div className="black">{item.title}</div>
                                    <div className="grey">by {item.author_name}</div>
					            </div>
				            </div>
                        </td>
                        <td>
                            <div className="table_column">{item?.price_currency} {item?.price}</div>
                        </td>
                        <td>
                            <div className="table_column">
                                <img 
                                    src={DELETE_BUTTON_ICON}
                                    alt=""
                                    width="18px"
                                    height="18px"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onClickDeleteIcon(item?.cart_id)}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
