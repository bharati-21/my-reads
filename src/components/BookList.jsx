import {useBooks} from '../custom-hooks/useBooks';
import {Book} from './Book';
import {SearchForm} from './SearchForm';


const BookList = () => {

    const {books, loading, error, searchText, dispatch} = useBooks();

    const searchBook = (e) => {
        e.preventDefault();
    }

    const getFilteredBooks = () => {
        if(searchText !== "") 
            return books.filter(book => book.title.includes(searchText));
        return books;
    }

    const filteredBooks = getFilteredBooks();

    const handleAddToTBR = () => {

    }

    const handleAddToShelf = () => {
        
    }

    return (
    <div>
        <SearchForm dispatch={dispatch} searchText={searchText} searchBook={searchBook} />
        {loading && <h3>{loading}</h3>}
        {error!=="" && <h3>{error}</h3>}
        <ul className="booklist-container">
        {
            !filteredBooks.length ? <div>No Books Found!</div> :  
            filteredBooks.map(book => <Book book={book} handleAddToShelf={handleAddToShelf} handleAddToTBR={handleAddToTBR} />)
        }
        </ul>
    </div>
  )
}

export {BookList}