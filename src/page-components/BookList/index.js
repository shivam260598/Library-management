import React, { useEffect, useState, useCallback } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase';
import List from './List';
import Header from './Header';
import './styles.css';
import { useLocation } from 'react-router-dom';

const BookList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const defaultAuthorId = queryParams.get('author_id');

    const [selectedBook, setSelectedBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookList, setBookList] = useState([]);
    const [authorNames, setAuthorNames] = useState({});
    const [authorFilter, setAuthorFilter] = useState(defaultAuthorId || '');
    const [genreFilter, setGenreFilter] = useState('');
    const [genreNames, setGenreNames] = useState([]);

    const getData = useCallback(async () => {
        try {
            let q = query(collection(db, "books"));
            if (genreFilter) {
                q = query(q, where("genre", "==", genreFilter));
            }
            if (authorFilter) {
                q = query(q, where("author_id", "==", authorFilter));
            }
      
            const querySnapshot = await getDocs(q);
            const temp = [];
      
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
            setBookList(temp);
            setLoading(false);
        } catch (error) {
            console.log('Error in getData :: ', error);
        }
    }, [authorFilter, genreFilter]);

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

    const getGenreNames = useCallback( async () => {
        try {
            const bookRef = query(collection(db, "books"));
            const querySnapshot = await getDocs(bookRef);
            const temp = [];
            querySnapshot.forEach((doc) => {
                temp.push(doc.data().genre);
            });
            setGenreNames(temp);
        } catch (error) {
            console.log('getGenreNamesError :: ', error);
        }
    }, []);

    useEffect(() => {
        getData();
        getAuthorName();
        getGenreNames();
    }, [authorFilter, genreFilter, getData, getGenreNames]);

    if (loading) return 'loading...';

    return (
        <div className="book_list_container">
            <Header 
                authorFilter={authorFilter}
                setAuthorFilter={setAuthorFilter}
                genreFilter={genreFilter}
                setGenreFilter={setGenreFilter}
                authorNames={authorNames}
                bookList={bookList}
                genreNames={genreNames}
            />

            <List 
                bookList={bookList}
                setSelectedBook={setSelectedBook}
                authorNames={authorNames}
                selectedBook={selectedBook} 
            />
        </div>
    );
};

export default BookList;
