import React from 'react';
import ModalComponent from '../ModalComponent';
import './styles.css';

const List = ({ bookList, setSelectedBook, authorNames, selectedBook }) => {
    return (
        <div className="list_body">
            {(bookList || []).map((item) => (
                <div
                    role="presentation"
                    className="list_card"
                    key={item}
                    onClick={() => setSelectedBook(item)}
                >
                    <div className="img_section">
                        <img
                            src={item?.cover_page_url}
                            alt={item?.title}
                            width="100%"
                        />
                    </div>
                    <div className="text_section">
                        <div className="black">
                            <span>{`${item.title} `}</span>
                        </div>
                        <div className="grey">
                            <span>
                                by {authorNames?.[item.author_id] || ''}
                            </span>
                        </div>
                        <div>
                            <span className="cost_real">
                                {item?.price_currency}
                                {' '}
                                {item.price}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {selectedBook
                ? <ModalComponent 
                    selectedBook={selectedBook} 
                    authorNames={authorNames} 
                    setSelectedBook={setSelectedBook} 
                />
                : null}
        </div>
    );
};

export default List;
