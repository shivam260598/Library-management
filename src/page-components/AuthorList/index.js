import React, { useEffect, useState } from 'react';
import './styles.css';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const AuthorList = () => {
    const [authorList, setAuthorList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthorName = async () => {
        try {
            const q = query(collection(db, "authors"));
            const querySnapshot = await getDocs(q);
            let temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({id: doc.id, ...doc.data()});
            });
            setAuthorList(temp);
            setLoading(false);
        } catch (error) {
            console.log('getAuthorNameError :: ', error);
        }
    };

    useEffect(() => {
        getAuthorName();
    }, []);

    console.log('authorList :: ', authorList);

    const onCļickAuthorName = (id) => {
       window.location.href = `/books?author_id=${id}`;
    }

    if (loading) return 'loading...';

    return (
        <div className="author_container">
            {(authorList || []).map((item) => (
                <div 
                    className="name_container"
                    onClick={() => onCļickAuthorName(item.id)}
                >
                    <span style={{ marginLeft: 20 }}>{item?.name}</span>
                </div>
            ))}
        </div>
    );
};

export default AuthorList;