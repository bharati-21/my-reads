import React, { useState } from 'react'
import {useAuth} from '../contexts/auth-context';
import { Link } from 'react-router-dom';

import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {
    const { authDispatch } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({
        password: {theme: '', message: ''},
        email: {theme: '', message: ''}
    });

    const handleFormSubmit = async event => {
        event.preventDefault();
        setError(null);
        try {
            const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            if(response.status >=200 && response.status < 300 ) {
                authDispatch({type: 'LOGIN', payload: response.user});
            }
            else {
                throw new Error('Inavlid email or password');
            }
        }
        catch(error) {
            if(error.message.includes('user-not-found')) {
                setError('User not found. Invalid Email or Password.');
            } 
            else {
                setError('Invalid Email or Password');
            }
        }
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setFormData(prevFormData => ({...prevFormData, [name]: value}));
        if(value === "") {
            setMessage(prevMessage => ({...prevMessage, [name]: {theme: 'error', message:`${name} cannot be empty`}}));
        }
        else {
            setMessage(prevMessage => ({...prevMessage, [name]: {theme: '', message:``}}));
            if(name === 'password') {
                if(value.length < 6) {
                    setMessage(prevMessage => ({...prevMessage, [name]: {theme: 'error', message: 'Password should be at lease 6 characters long'}}));
                }
                else {
                    const regex = /([0-9]+[A-Za-z]+)|([A-Za-z]+[0-9]+)/;  
                    if(!regex.test(value)) {
                        setMessage(prevMessage => ({...prevMessage, [name]: {theme: 'error', message: 'Password should have at least one number and one letter'}}));
                    }
                    else {
                        setMessage(prevMessage => ({...prevMessage, [name]: {theme: 'success', message: 'Password accepted'}}));
                    }
                }
            }
            else if(name === 'email') {
                const regex = /^[a-z0-9]{3,}@[a-z]+\.[a-z]{2,3}$/;
                if(!regex.test(value)) {
                    setMessage(prevMessage => ({...prevMessage, [name]: {theme: 'error', message: 'Incorrect email. Example - workingexample@email.com'}}));
                }
                else {
                    setMessage(prevMessage => ({...prevMessage, [name]: {theme: 'success', message: 'Email accepted'}}))
                }
            }
        }
        
    }

    return (
        <div className="auth-container login-container">
            <h2 className="section-head">Login</h2>
            <form onSubmit={handleFormSubmit} className="auth-form">
                <div className="input-group">
                    <input type="email" name="email" placeholder="Enter your email..." value={formData.email}  onChange={handleInputChange} required />    
                    <p className={`input-message message ${message.email.theme}`}>
                        {message.email.message}
                    </p>
                </div>
                <div className="input-group">
                    <input type="password" name="password" placeholder="Enter your password..." value={formData.password} onChange={handleInputChange} required />
                    <p className={`input-message message ${message.password.theme}`}>
                        {message.password.message}
                    </p>
                </div>
                
                <input type="submit" value="Login" className="btn btn-accent"/>
                <p className='auth-error'>{error}</p>
            </form>
            <div className="auth-redirect">
                New user? <Link to="/signup" className="link">Signup here</Link>
            </div>
        </div>
    )
}

export {Login};