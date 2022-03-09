import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from './contexts/theme-context';
import {TbrProvider} from './contexts/tbr-context';
import { AuthProvider } from './contexts/auth-context';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider>
                <TbrProvider>
                    <App />
                </TbrProvider>
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
