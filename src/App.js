import './App.css';
import React from 'react';
import Framebars from './utils/sidebar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Firstpage from './pages/firstpage'
import Tasks from './pages/tasks'
import Stat from './pages/stat'
import Luixiao from './pages/lux'
import Login from './pages/login'


function App() {
  return (
    <div className='App'>
    <Router>
    
      <Framebars/>
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/tasks' component={Tasks}/>
        <Route path='/me' component={Stat}/>
        <Route path='/lux' component={Luixiao}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
