import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { BookList } from './pages/BookList'
import { MyAccount } from './pages/MyAccount';
import { MyTbr } from './pages/MyTbr';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

import { Navbar } from './components/Navbar';
import { useTheme } from './contexts/theme-context';
import { Footer } from './components/Footer';


const App = () => {
    const {theme} = useTheme();
    return (
        <div className={`App ${theme}`}>
            <div className="app-container">
                <BrowserRouter> 
                    <Navbar />
                    <Routes>
                        <Route 
                            path='*' 
                            element={<NotFound />} 
                        />
                        <Route 
                            path="/" element={<BookList  />}
                        />
                        <Route 
                            path="/account" element={<MyAccount  />}
                        />
                        <Route 
                            path="/tbr" element={<MyTbr  />}
                        />
                        <Route 
                            path="/login" element={<Login  />}
                        />
                        <Route 
                            path="/signup" element={<Signup  />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>          
            <Footer />
        </div>
    );
}

export default App;
