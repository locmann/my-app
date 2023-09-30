import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="App-wrapper-content">
          <Routes>
            <Route path="/dialogs/" element={<DialogsContainer />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
