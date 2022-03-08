import React from 'react'

const Book = ({book, children}) => {
    return (
        <div className="book-container">
            <img src={book.imageUrl} alt="Book Cover" className="book-cover-img" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <div className="button-container">
                {children}
            </div>
        </div>
    )
}

export {Book};