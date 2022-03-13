import {useBooks} from '../custom-hooks/useBooks';
import {Book} from '../components/Book';
import {SearchForm} from '../components/SearchForm';
import {useTbr} from '../contexts/tbr-context';
import { useToast } from '../custom-hooks/useToast';
import { Toast } from '../components/Toast';

import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {  
    const {books, loading, error, searchText, dispatch} = useBooks();

    const {tbrState, tbrDispatch} = useTbr();

    const {toastDispatch, toastTheme, toastText, showToast} = useToast();

    const getFilteredBooks = () => {
        if(searchText !== "") 
            return books.filter(book => book.title.toLowerCase().startsWith(searchText.toLowerCase()) || book.title.toLowerCase().includes(searchText.toLowerCase()));
        return books;
    }

    const filteredBooks = getFilteredBooks();

    const postDataToTbr = async book => {
        try {
            const res = await axios.post('http://localhost:5000/tbr', book);
            if(res.status >= 200 && res.status < 300) {
                return true;
            }
            throw new Error('Something went really wrong!')
        }
        catch(error) {
            return false;
        } 
    }

    const sendDispatchToTbr = (book, type, text) => {
        tbrDispatch({type, payload: book});
        if(postDataToTbr(book)) {
            toastDispatch({type: 'SHOW_TOAST', payload: {toastText: text, toastTheme: 'success'}});
        }
        else {
            toastDispatch({type: 'SHOW_TOAST', payload: {toastText: 'Something went really wrong!', toastTheme: 'error'}});
        }
        setTimeout(() => toastDispatch({type: 'HIDE_TOAST'}), 3000);
    }

    const checkIfBookInTbr = id => {
        return tbrState.find(tbrBook => tbrBook.id === id);
    }

    return (
    <div>
            {showToast && <Toast toastText={toastText} toastTheme={toastTheme} toastDispatch={toastDispatch} />}
            <SearchForm dispatch={dispatch} searchText={searchText} />
            {loading && <h3>{loading}</h3>}
            {error!=="" && <h3 className="error">{error}</h3>}
            {
                !loading && !error && 
                <ul className="booklist-container">
                {
                    !filteredBooks.length ? 
                        <div>
                            No Books Found!
                        </div> :  
                    filteredBooks.map(book => (
                        <Book key={book.id} book={book}>
                            {
                                checkIfBookInTbr(book.id) ? <Link to="/tbr">
                                    <button className="btn btn-secondary">
                                        Go to TBR
                                    </button></Link>
                                :
                                <button className="btn btn-secondary btn-add-tbr" onClick={e => sendDispatchToTbr(book, 'ADD_TO_TBR', `Added ${book.title} to TBR`)}>Add to TBR</button>
                            }
                        </Book>
                    ))
                }
                </ul>
            }
    </div>
  )
}

export {BookList}