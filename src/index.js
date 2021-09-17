import React from 'react';
import ReactDOM from 'react-dom';
// import LoginMain from './pages/login'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Userstate from './utils/moves'
global.CurrentUser = new Userstate()

ReactDOM.render(
  <Router>
    {/* <LoginMain /> */}
    <App className='app' />
  </Router>,
  document.getElementById('root')
);

