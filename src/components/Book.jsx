import React from 'react'

const Book = ({book, handleAddToTBR, handleAddToShelf}) => {
    return (
        <div className="book-container">
            <img src={book.imageUrl} alt="Book Cover"  />
            <li>{book.title}</li>
            <li>{book.author}</li>
            <div className="button-container">
                <button className="btn btn-secondary" onClick={handleAddToTBR}>Add to TBR</button>
                <button className="btn btn-accent" onClick={handleAddToShelf}>Add to Shelf</button>
            </div>
        </div>
    )
}

export {Book};