import React from 'react'

const Book = ({book, handleAddToTBR, handleAddToShelf}) => {
    return (
        <div className="book-container">
            <img src={book.imageUrl} alt="Book Cover" className="book-cover-img" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <div className="button-container">
                <button className="btn btn-secondary btn-add-tbr" onClick={handleAddToTBR}>Add to TBR</button>
                <button className="btn btn-accent btn-add-shelf" onClick={handleAddToShelf}>Add to Shelf</button>
            </div>
        </div>
    )
}

export {Book};