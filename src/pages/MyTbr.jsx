import { Book } from '../components/Book';
import { useTbr } from '../contexts/tbr-context';
import axios from 'axios';
import { Toast } from '../components/Toast';
import { Link } from 'react-router-dom';

import { useToast } from '../custom-hooks/useToast';

const MyTbr = () => {  

    const {tbrState, tbrDispatch} = useTbr();

    const {toastDispatch, showToast, toastText, toastTheme } = useToast();    

    const postDataToTbr = async book => {
        try {
            const res = await axios.delete(`http://localhost:5000/tbr/${book.id}`);
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

    return (
    <div>
            {showToast && <Toast toastTheme={toastTheme} toastText={toastText} />}
            <h2 className="section-head">
                
                    Check out all the books <Link to='/' className='link link-home'>here</Link>
            </h2>
            {
                <ul className="booklist-container">
                {
                    !tbrState.length ? 
                        <div>
                            No Books in TBR!
                        </div> :  
                    tbrState.map(book => (
                        <Book key={book.id} book={book}>
                            <button className="btn btn-secondary btn-add-tbr" onClick={e => sendDispatchToTbr(book, 'REMOVE_FROM_TBR', `Removed ${book.title} from TBR`)}>Remove from TBR</button>
                        </Book>
                    ))
                }
                </ul>
            }
    </div>
  )
}

export {MyTbr}