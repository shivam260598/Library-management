import React from 'react';
import './styles.css';

const some_text = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

const FEATURED_BOOK_URL = "https://network9.biz/wp-content/uploads/2019/04/url-211.jpeg";

const Home = () => {
    return (
        <div className="flex">
            <div className="home_container">
                <div className="welcome_header">WELCOME</div>
                <div className="sub_header">TO MY LIBRARY</div>
                <div className="some_text">{some_text}</div>
                <button className="browse_button" onClick={() => window.location.href = '/books'}>
                    Browse Books
                </button>
            </div>

            <div className="featured_book">
                <p>Featured book:</p>
                <img
                    src={FEATURED_BOOK_URL}
                    alt="featured book"
                />
            </div>
        </div>
    );
};

export default Home;