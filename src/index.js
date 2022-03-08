import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from './contexts/theme-context';
import {TbrProvider} from './contexts/tbr-context';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
        <TbrProvider>
            <App />
        </TbrProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
