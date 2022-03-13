import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

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
import { useAuth } from './contexts/auth-context';


const App = () => {
    const {authState} = useAuth();
    const {user, authIsReady} = authState;
    const {theme} = useTheme();

    return (
        <div className={`App ${theme}`}>
            {
                authIsReady && (
                    <>
                        <div className="app-container">
                            <BrowserRouter> 
                                <Navbar />
                                <Routes>
                                    <Route 
                                        path='*' 
                                        element={
                                            <NotFound />
                                        } 
                                    />
                                    <Route 
                                        path="/" element= {
                                            user ? <BookList />
                                            : 
                                            <Navigate to="/login"/>
                                        }
                                    />
                                    <Route 
                                        path="/account" element= { 
                                            user ? <MyAccount /> 
                                            : 
                                            <Navigate to="/login"/>
                                        }
                                    />
                                    <Route 
                                        path="/tbr" element= {
                                            user ? <MyTbr /> 
                                            : 
                                            <Navigate to="/login"/>
                                        }
                                    />
                                    <Route 
                                        path="/login" element={!user ?  
                                            <Login  /> 
                                            : 
                                            <Navigate to="/" />
                                        }
                                    />
                                    <Route 
                                        path="/signup" element={
                                            !user ? 
                                            <Signup  /> 
                                            : 
                                            <Navigate to="/" />
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </div>          
                        <Footer />
                    </>
                )
            }
        </div>
    );
}

export default App;