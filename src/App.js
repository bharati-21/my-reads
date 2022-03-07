import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { BookList } from './pages/BookList'
import { MyShelf } from './pages/MyShelf';
import { MyTbr } from './pages/MyTbr';
import { NotFound } from './pages/NotFound';

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
                            path="/shelf" element={<MyShelf  />}
                        />
                        <Route 
                            path="/tbr" element={<MyTbr  />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>          
            <Footer />
        </div>
    );
}

export default App;
