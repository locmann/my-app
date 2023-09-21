import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

function App() {

  
  return (
    <BrowserRouter>
      <div className="App-wrapper">
        <Header />
        <Navbar />
        <div className="App-wrapper-content">
          <Routes>
            <Route path="/dialogs/" element={<DialogsContainer />} />
            <Route path="/profile/" element={<Profile />} />

          </Routes>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
