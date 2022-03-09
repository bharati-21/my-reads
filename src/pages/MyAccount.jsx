import React from 'react';
import { useAuth } from '../contexts/auth-context';

const MyAccount = () => {
    const { authState } = useAuth();

    const {user : {email, displayName}} = authState;

    return (
        <div className="account-container">
            <h2 className="section-head">
                My Account
            </h2>   
            <div className="account-details">
                <div className="account-info account-user-name">
                    <h4 className="info-head">Name</h4> <span className="info-value">{displayName}</span>
                </div> 
                <div className="account-info account-user-name">
                    <h4 className="info-head">Email</h4> <span className="info-value">{email}</span>
                </div>   
            </div> 
        </div>
    );
}

export {MyAccount};