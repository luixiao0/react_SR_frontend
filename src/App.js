import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Upload from './Upload';
import Dragger from './components/Dragger/Dragger';
import TaskList from './components/TaskList/TaskList';
import User from './moves'

import { host } from './const.js'
global.User = new User(host)


function App() {
  const [login, setLogin] = useState(false)
  const [dark, setDark] = useState(false)
  const [progress, setProgress] = useState(0)
  const [param, setParam] = useState({ anime: true, sf: 4 })
  const progressref = useRef(null)
  const loginref = useRef(null)


  useEffect(()=>{
    progressref.current.style.width = `${progress}%`
  },[progress])

  const progresssetter = (p) => {
    console.log(p, "%")
    setProgress(p)
    if (progress >= 95) {
      setTimeout(() => {
        setProgress(0)
      }, 1500)
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
    if (index) {
      param.anime = false
    }
    else {
      param.anime = true
    }
    setParam(param)
  }

  const onParamChange = (name, value) => {
    param[name] = value
    // console.log(name, value, param)
    setParam(param)
  }

  const onDisplaymodeChange = () => {
    setDark(!dark)
  }

  return (
    <div className={`w-full ${dark ? 'dark text-white' : 'white text-black'} duration-100`}>
      <header className={`stick top-0 z-30 ${dark ? 'bg-gray-900' : 'bg-white-900'} duration-100 backdrop-blur firefox:bg-opacity-90`}>
        <div className='flex items-center  justify-between max-w-8xl xl:px-8 border-b border-gray-100 dark:border-white-800'>
          <h1 className=' px-4 py-2 lg:px-8 sm:px-6 xl:px-0 '>
            <p className="subpixel-antialiased">一个在线超分辨率工具</p>
          </h1>
          <button className={`rounded-xl p-1 mr-4 ${dark ? 'bg-gray-700' : 'bg-white'} duration-100 border-none`} onClick={onDisplaymodeChange}>
            {dark ?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>} </button>
        </div>


      </header>

      <div className="lg:flex justify-center">
        {/* <div className="flex justify-center"> */}
        <div>
          <Upload onParamChange={onParamChange} onTabChange={onTabChange} dark={dark} />
          <Dragger onFile={onFile} dark={dark} />
        </div>

        {/* <div className="lg:w-full xl:w-1/3"> */}

        <div className="md:w-full lg:w-2/3 xl:w-1/3">
          <TaskList onDL={onDL} dark={dark} />
        </div>
      </div>

      <div className="sticky bottom-0 w-full h-1 z-20">
        <div ref={progressref} className="rounded-xl w-0 progressbar h-full duration-500"></div>
      </div>
      {/* <button className="rounded-xl bg-white p-2" onClick={() => {
      }}>debug</button> */}
      <footer>
        <button className={`rounded-xl px-2 ${dark ? 'bg-gray-700' : 'bg-white'} duration-100 border-none`} onClick={
          () => {
            setLogin(!login)
            loginref.current.value = ""
          }}> share </button>
        <input autoFocus ref={loginref} className={login ? "" : "hidden"} onChange={(e) => {
          global.User.onChange(e, () => {
            setLogin(false)
          })
        }} />
        {global.User.uid}
      </footer>
    </div>
  );

}


export default App;
