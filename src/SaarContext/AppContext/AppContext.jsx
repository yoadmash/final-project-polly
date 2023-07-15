import React, { createContext, useState } from 'react';

const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const [books, setBooks] = useState([
        { id: 1, title: 'react', author: 'Author ' },
        { id: 2, title: 'html', author: 'Author 2' },
        { id: 3, title: 'java', author: 'Author 3' },
    ]);

    const [persons, setPersons] = useState([
        { id: 1, title: 'book 1', author: 'Author 1' },
        { id: 2, title: 'book 2', author: 'Author 2' },
        { id: 3, title: 'book 3', author: 'Author 3' },
    ]);


    const [purchases, setPurchases] = useState([]);

    const purchaseBook = (personId, bookId) => {
        setPurchases((prevPurchases) => [
            ...prevPurchases,
            { personId: parseInt(personId), bookId: parseInt(bookId) },

        ])
    };

    return (
        <AppContext.Provider
            value={{
                books,
                setBooks,
                persons,
                setPersons,
                purchases,
                purchaseBook,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
