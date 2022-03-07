import CodeIcon from '@mui/icons-material/Code';

import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
        <p class="author">Made with <CodeIcon className="code-icon"/> by Bharati</p>
        <small>All rights reserved. &copy; {new Date().getFullYear()}</small>
    </footer>
  )
}

export {Footer};