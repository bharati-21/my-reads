import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import '../styles/navbar.css';

import { Link,} from 'react-router-dom';

import {useTheme} from '../contexts/theme-context';

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();
  return (
        <nav className="navbar">
            <h3 className="logo">
               <Link to="/">myReads</Link>
            </h3>
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
            <div className="theme-wrapper" onClick={toggleTheme}>
                {theme === 'dark' ? <LightModeIcon  /> : <DarkModeIcon /> }
            </div>
        </nav>
  )
}

export {Navbar};