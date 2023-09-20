import store from './redux/reduxStore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
function renderEntireTree(state) {

  root.render(
    <React.StrictMode>
      <App /* state={state} dispatch={store.dispatch.bind(store)} */ store={store}
      />
    </React.StrictMode>
  );
}

renderEntireTree(store.getState());
store.subscribe(() => {
  let state = store.getState();
  renderEntireTree(state);
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
