import {useContext, createContext, useReducer, useEffect} from 'react';
import axios from 'axios';

const TbrContext = createContext([]);

const {Provider} = TbrContext;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const reducerFunction = (prevTbr, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case 'GET_TBR_BOOKS':
            return payload;

        case 'ADD_TO_TBR': {
            const book = payload;
            const date = `${new Date().getDate()} ${MONTHS[new Date().getMonth()]}, ${new Date().getFullYear()}`;
            return [...prevTbr, {...book, date}] ;  
        }
                      
        case 'REMOVE_FROM_TBR': {
            const book = action.payload;
            return prevTbr.filter(tbrBook => tbrBook.id !== book.id);
        }

        default:
            return prevTbr;
    }
}

const TbrProvider = ({children}) => {
    const [tbrState, tbrDispatch] = useReducer(reducerFunction, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('http://localhost:5000/tbr');
                const {data} = res;
                tbrDispatch({type: 'GET_TBR_BOOKS', payload: data});
            }
            catch(error) {
            }
        })();
    }, [])

    return (
        <Provider value={{tbrState, tbrDispatch}}>
            {children}
        </Provider>
    );
};

const useTbr = () => useContext(TbrContext);

export {TbrProvider, useTbr};