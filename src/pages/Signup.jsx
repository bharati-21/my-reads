import React, { useState } from 'react'
import {useAuth} from '../contexts/auth-context';
import { Link } from 'react-router-dom';

import { auth } from '../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { updateProfile } from 'firebase/auth';

const Signup = () => {
    const {authDispatch} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({
        name: {theme: '', message: ''},
        password: {theme: '', message: ''},
        email: {theme: '', message: ''}
    });

    const handleFormSubmit = async event => {
        event.preventDefault();
        setError(null);
        try {
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const updatedResponse = await updateProfile(auth.currentUser, {displayName: formData.name});
            console.log(updatedResponse)
            authDispatch({type: 'LOGIN', payload: response.user});
        }
        catch(error) {
            if(error.message.includes('email-already-in-use')) {
                setError('Email already in use');
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
            if(name === 'name') {
                if(value.length < 3) {
                    setMessage(prevMessage => ({...prevMessage, name: {theme: 'error', message:`Name should have more than 3 characters`}}));
                }
                else {
                    setMessage(prevMessage => ({...prevMessage, name: {theme: 'success', message:`Valid Name`}}));
                }
            }
            else if(name === 'password') {
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
        <div className="auth-container signup-container">
            <h2 className="section-head">Signup</h2>
            <form onSubmit={handleFormSubmit} className="auth-form signup-form">
                <div className="input-group">
                    <input type="text" name="name" placeholder="Enter your name..." value={formData.name} onChange={handleInputChange} required />
                    <p className={`input-message message ${message.name.theme}`}>
                        {message.name.message}
                    </p>
                </div>
                <div className="input-group">
                    <input type="email" placeholder="Enter your email..." value={formData.email} onChange={handleInputChange} name="email" required />
                    <p className={`input-message message ${message.email.theme}`}>
                        {message.email.message}
                    </p>
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Enter your password..." name="password" value={formData.password} onChange={handleInputChange} required />
                    <p className={`input-message message ${message.password.theme}`}>
                        {message.password.message}
                    </p>
                </div>  
                <input type="submit" className='btn btn-accent' value="Signup" />
                {error && <p className='auth-error'>{error}</p>}
            </form>
            <div className="auth-redirect">
                Already a user? <Link to="/login" className="link">Login here</Link>
            </div>
        </div>
    )
}

export {Signup};
