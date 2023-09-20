import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App(props) {


  return (
    <BrowserRouter>
      <div className="App-wrapper">
        <Header />
        <Navbar />
        <div className="App-wrapper-content">
          <Routes>
            <Route path="/dialogs/" element={<Dialogs state={props.state.msgPage}
              addMessage={props.addMessage} updateMessageData={props.updateMessageData} />} />
            <Route path="/profile/" element={<Profile profile={props.state.profilePosts}
              dispatch={props.dispatch} />} />

          </Routes>
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
