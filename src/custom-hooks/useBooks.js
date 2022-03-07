import React, { useEffect, useReducer } from 'react'
import axios from 'axios';

const useBooks = () => {
    const reducerFunction = (prevState, action) => {
        switch(action.type) {
            case 'SET_BOOKS':
                return {...prevState, books: action.payload};
            case 'SET_LOADING':
                return {...prevState, loading: action.payload};
            case 'SET_ERROR':
                return {...prevState, error: action.payload};
            case 'SET_SEARCH_TEXT':
                return {...prevState, searchText: action.payload};
            default:
                return prevState;
        } 
    }

    const [{books, loading, error, searchText}, dispatch] = useReducer(reducerFunction, {
        books: [], 
        loading: "Loading Books", 
        error: null,
        searchText: ""
    });
    
    useEffect(() => {
        (async () => {
            try {
                dispatch({type: 'SET_ERROR', payload: null}); 
                dispatch({type: 'SET_LOADING', payload: "Loading Books..."}); 
                const res = await axios.get("http://localhost:5000/books");
                if(res.status >=200 && res.status<300) {
                    const {data} = res;
                    dispatch({type: 'SET_BOOKS', payload: data}); 
                }
                else {
                    throw new Error("Request Failed");
                }
                      
                dispatch({type: 'SET_LOADING', payload: null}); 
            }
            catch(error) {
                console.log(error);
                dispatch({type: 'SET_LOADING', payload: null}); 
                dispatch({type: 'SET_ERROR', payload: 'Something went really wrong! Try again'});
            }
        })()
    }, []);

    return {books, loading, error, searchText, dispatch};
}

export {useBooks};