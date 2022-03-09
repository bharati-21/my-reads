import {useContext, createContext, useReducer, useEffect} from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({});

const {Provider} = AuthContext;

const reducerFunction = (prevUser, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'LOGIN':
            return {...prevUser, user: payload};

        case 'LOGOUT':
            return {...prevUser, user: null}

        case 'AUTH_IS_READY':
            return {user: payload, authIsReady: true}

        default:
            return prevUser;
    }
}

const AuthProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(reducerFunction, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            authDispatch({ type: 'AUTH_IS_READY', payload: user});
            unSubscribe();
        })
    }, [])

    console.log(authState);

    return (
        <Provider value={{authState, authDispatch}}>
            {children}
        </Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};