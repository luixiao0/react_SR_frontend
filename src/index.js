import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginMain from './pages/login'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <>
    <LoginMain/>
    <Router>
      <App className='app'/>
    </Router>,
  </>,
  document.getElementById('root')
);

