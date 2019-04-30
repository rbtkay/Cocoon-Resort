import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
// import Test from './App/Test';
import * as serviceWorker from './serviceWorker';

// if (window.location.href === 'http://localhost:3000/user') {
//     ReactDOM.render(<Test />, document.getElementById('root'));
// } else {
ReactDOM.render(<App />, document.getElementById('root'));
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
