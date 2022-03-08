import {useBooks} from '../custom-hooks/useBooks';
import {Book} from '../components/Book';
import {SearchForm} from '../components/SearchForm';


const BookList = () => {  
    const {books, loading, error, searchText, dispatch} = useBooks();

    const getFilteredBooks = () => {
        if(searchText !== "") 
            return books.filter(book => book.title.toLowerCase().startsWith(searchText.toLowerCase()));
        return books;
    }

    const filteredBooks = getFilteredBooks();

    const handleAddToTBR = () => {

    }

    const handleAddToShelf = () => {
        
    }

    return (
    <div>
        <SearchForm dispatch={dispatch} searchText={searchText} />
        {loading && <h3>{loading}</h3>}
        {error!=="" && <h3>{error}</h3>}
        {
            !loading && !error && 
            <ul className="booklist-container">
            {
                !filteredBooks.length ? 
                    <div>
                        No Books Found!
                    </div> :  
                filteredBooks.map(book => <Book key={book.id} book={book} handleAddToShelf={handleAddToShelf} handleAddToTBR={handleAddToTBR} />)
            }
            </ul>
        }
    </div>
  )
}

export {BookList}