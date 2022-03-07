import './App.css';
import {Navbar} from './components/Navbar';
import {useTheme} from './contexts/theme-context';
import {BookList} from './components/BookList'
import { Footer } from './components/Footer';

const App = () => {
    const {theme} = useTheme();
    return (
        <div className={`App ${theme}`}>
            <div className="app-container">
                <Navbar />
                <BookList  />
            </div>
            <Footer />
        </div>
    );
}

export default App;
