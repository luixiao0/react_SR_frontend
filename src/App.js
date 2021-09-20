import React, { useState, useRef } from 'react';
import './App.css';
import Upload from './Upload';
import Dragger from './components/Dragger/Dragger';
import TaskList from './components/TaskList/TaskList';
import User from './moves'

import {host} from './const.js'
global.User = new User(host)


function App() {
  const [state, setState] = useState({
    showlogin: false,
    progress: 0,
    dark: false
  })

  const [param, setParam] = useState({ anime: true, sf: 4 })
  const progressref = useRef(null)
  const loginref = useRef(null)

  const progressupdate = (p) => {
    setState({ progress: p })
    progressref.current.style.width = `${state.progress}%`
  }

  const progresssetter = (p) => {
    console.log(p, "% uploaded")
    progressupdate(p)
    if (state.progress >= 95) {
      setTimeout(() => { progressupdate(0) }, 500)
    }
  }

  const onFile = (file, setter) => {
    for (let i of file) {
      console.log(param, "upload")
      global.User.newTask(i, param, (p) => { progresssetter(p); setter(p) })
    }
  }

  const onDL = (takid) => {
    global.User.DlTask(takid, (p) => { progresssetter(p) })
  }

  const onTabChange = (index) => {
    let params = JSON.parse(JSON.stringify(param))
    if (index) {
      params.anime = false
      setParam(params)
    }
    else {
      params.anime = true
      setParam(params)
    }
  }

  const onParamChange = (name, value) => {
    let params = JSON.parse(JSON.stringify(param))
    params[name] = value
    // console.log(params)
      setParam(params)
  }

  const onDisplaymodeChange = () => {
    setState({ dark: !state.dark })
  }

  return (
    <div className={`w-full bg-white dark:bg-gray-900 md:h-screen ${state.dark ? 'dark' : 'light'}`}>
      <header className='stick top-0 z-30  bg-white-900 dark:bg-gray-900 backdrop-filter backdrop-blur firefox:bg-opacity-90'>
        <div className='flex items-center  justify-between max-w-8xl xl:px-8 border-b border-white-800'>
          <h1 className=' px-4 py-2 lg:px-8 sm:px-6 xl:px-0 '>
            <p className="subpixel-antialiased">一个在线超分辨率工具</p>
          </h1>
          <button className="rounded-xl px-2 bg-white dark:bg-gray-700" onClick={onDisplaymodeChange}>
             {state.dark? "dark":"light"} </button>
        </div>


      </header>

      <div className="lg:flex justify-center">
        {/* <div className="flex justify-center"> */}
        <div>
          <Upload onParamChange={onParamChange} onTabChange={onTabChange} />
          <Dragger onFile={onFile} />
        </div>

        {/* <div className="lg:w-full xl:w-1/3"> */}

        <div className="md:w-full lg:w-2/3 xl:w-1/3">
          <TaskList onDL={onDL} />
        </div>
      </div>

      <div className="sticky bottom-0 w-full h-1 z-20 overflow-x-hidden">
        <div ref={progressref} className="rounded-xl w-0 progressbar h-full duration-500"></div>
      </div>
      {/* <button className="rounded-xl bg-white p-2" onClick={() => {
      }}>debug</button> */}
      <footer>
        <button className="rounded-xl px-2 bg-white dark:bg-gray-900" onClick={
          () => {
            setState({ showlogin: !state.showlogin })
            loginref.current.value = ""
          }}> share </button>
        <input autoFocus ref={loginref} className={state.showlogin ? "" : "hidden"} onChange={(e) => {
          global.User.onChange(e, () => {
            setState({ showlogin: false })
          })
        }} />
        {global.User.uid}
      </footer>
    </div>
  );

}


export default App;
