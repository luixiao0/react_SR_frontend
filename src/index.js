import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'

ReactDOM.render(
  // <React.StrictMode>
  <>
    <Router>
      <App className='app'/>
    </Router>,
  </>,
  document.getElementById('root')
  // {/* </React.StrictMode>, */}
);

