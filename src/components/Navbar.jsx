import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import '../styles/navbar.css';

import { Link } from 'react-router-dom';
import { useLogout} from '../custom-hooks/useLogout';

import {useTheme} from '../contexts/theme-context';
import { useAuth } from '../contexts/auth-context';


const Navbar = () => {
    const {authState} = useAuth();
    const {user} = authState;

    const { logout } = useLogout();
    const {theme, toggleTheme} = useTheme();

    return (
        <nav className="navbar">
            <h3 className="logo">
                <Link to="/">myReads</Link>
            </h3>
            {
                user && (
                    <ul className="navlinks">
                        <li className="nav-link">
                            <Link to="/tbr">
                                My TBR
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/account">
                                My Account
                            </Link>
                        </li>
                    </ul>
                )
            }
            <div className="account-theme-wrapper">
                <div className="theme-wrapper" onClick={toggleTheme}>
                    {theme === 'dark' ? <LightModeIcon  /> : <DarkModeIcon /> }
                </div>
                {
                    user &&
                    <button className="btn btn-accent btn-logout">
                        <Link to="/" onClick={logout}>Logout</Link>
                    </button>
                }
            </div>
        </nav>
    )
}

export {Navbar};