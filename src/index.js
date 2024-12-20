import './index.css';
import store from './redux/redux-store.ts'; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

//let rerenderEntireTree = (state) => {
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App state={state} dispatch={store.dispatch.bind(store)} store={store}/> */}
      <App />
    </Provider>
  </React.StrictMode>
);
 //}

reportWebVitals();

//Нам больше не надо отрисовывать дерево, тк подлючено react-redux , connect это делает дальше, локально отрисовывает.
// rerenderEntireTree(store.getState());

// store.subscribe( () => {
//   let state = store.getState();
//   rerenderEntireTree(state);
// });