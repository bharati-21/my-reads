import React, { useState } from 'react'
import {useAuth} from '../contexts/auth-context';

import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {
    const {authState, authDispatch} = useAuth();
    const [formData, setFormData] = useState({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleFormSubmit = async event => {
        event.preventDefault();
        setError(null);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            authDispatch({type: 'LOGIN', payload: response.user});
        }
        catch(error) {
            setError(error.message);
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Enter your email..." value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Enter your password..." value={password} onChange={e => setPassword(e.target.value)} required />
                <input type="submit" value="Login" />
            </form>
            <p>{error}</p>
        </div>
    )
}

export {Login};