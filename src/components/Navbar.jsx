import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import '../styles/navbar.css';

import {useTheme} from '../contexts/theme-context';

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();
  return (
    <nav className="navbar">
        <h3 className="logo">
            myReads
        </h3>
        <ul className="navlinks">
            <li className="nav-link">
                <a href="" className="link">
                    My Shelf
                </a>
            </li>
            <li className="nav-link">
                <a href="" className="link">
                    My TBR
                </a>
            </li>
        </ul>
        <div className="theme-wrapper" onClick={toggleTheme}>
            {theme === 'dark' ? <LightModeIcon  /> : <DarkModeIcon /> }
        </div>
    </nav>
  )
}

export {Navbar};