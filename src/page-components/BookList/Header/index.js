import React from 'react';
import './styles.css';

const Header = ({ 
    authorFilter,
    setAuthorFilter,
    genreFilter,
    setGenreFilter,
    authorNames,
    bookList,
    genreNames,
}) => {  
    const authorOptions = Object.entries(authorNames).map(([key, value]) => ({ value: key, label: value }));
    const genreOptions = (genreNames || []).map(element => ({
        value: element.toLowerCase(),
        label: element,
    }));

    return (
        <div className="filter_container">
            <select 
                className="select_container"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                style={{ marginRight: 12 }}
            >
                <option value="">-- Filter by genre --</option>
                {genreOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <select
                className="select_container"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
            >
                <option value="">-- Filter by Author --</option>
                {authorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Header;
