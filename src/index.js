import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './moves'
const dest = "http://88.jsjs.cf:8000"

global.User = new User(dest)
// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//   document.documentElement.classList.add('dark')
// } else {
//   document.documentElement.classList.remove('dark')
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);