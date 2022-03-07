import {useState, useContext, createContext} from 'react';

const ThemeContext = createContext('light');

const {Provider} = ThemeContext;

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = event => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

    return (<Provider value={{theme, toggleTheme}}>
        {children}
    </Provider>)
}

const useTheme = () => useContext(ThemeContext);

export {ThemeProvider, useTheme};