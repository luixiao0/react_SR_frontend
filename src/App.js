import React from 'react';
import './App.css';
import Upload from './Upload';
import Dragger from './components/Dragger/Dragger';
import TaskList from './components/TaskList/TaskList';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      params: { anime: true, sf: 4 },
      showlogin: false,
      progress: 0,
      dark: false
    }
    this.progressref = React.createRef()
    this.loginref = React.createRef()
  }

  progressupdate = (p) => {
    this.setState({ progress: p })
    this.progressref.current.style.width = `${this.state.progress}%`
  }

  progresssetter = (p) => {
    console.log(p, "% uploaded")
    this.progressupdate(p)
    if (this.state.progress >= 95) {
      setTimeout(() => {
        this.progressupdate(0)
      }, 500)
    }
  }

  onFile = (file, progresssetter) => {
    // console.log("file!")
    for (let i of file) {
      console.log(this.state.params, "upload")
      global.User.newTask(i, this.state.params, (p) => { this.progresssetter(p); progresssetter(p) })
    }
  }

  onDL = (takid) => {
    global.User.DlTask(takid, (p) => { this.progresssetter(p) })
  }

  onTabChange = (index) => {
    let params = JSON.parse(JSON.stringify(this.state.params))
    if (index) {
      params.anime = false
      this.setState({ params: params })
    }
    else {
      params.anime = true
      this.setState({ params: params })
    }
  }

  onParamChange = (name, value) => {
    let params = JSON.parse(JSON.stringify(this.state.params))
    params[name] = value
    // console.log(params)
    this.setState({ params: params })
  }


  onDisplaymodeChange = () => {
    // let htmlClasses = document.querySelector('html').classList;
    // if (localStorage.theme === 'dark') {
    //   htmlClasses.remove('dark');
    //   localStorage.removeItem('theme')
    // }
    // else {
    //   htmlClasses.add('dark');
    //   localStorage.theme = 'dark';
    // }

    // console.log(localStorage.getItem('theme'))
    this.setState({dark:!this.state.dark})
  }

  render() {
    return (
      <div className={this.state.dark?"dark":"light"}>
        <header className='stick top-0 z-30  bg-white-900 dark:bg-gray-900 backdrop-filter backdrop-blur firefox:bg-opacity-90'>
          <div className='flex items-center  justify-between max-w-8xl xl:px-8 border-b border-white-800'>
            <h1 className=' px-4 py-2 lg:px-8 sm:px-6 xl:px-0 '>
              <p className="subpixel-antialiased">一个在线超分辨率工具</p>
            </h1>
            <button className="rounded-xl px-2 bg-white dark:bg-gray-700" onClick={this.onDisplaymodeChange}> dark </button>
          </div>


        </header>

        <div className="lg:flex justify-center">
          {/* <div className="flex justify-center"> */}
          <div>
            <Upload onParamChange={this.onParamChange} onTabChange={this.onTabChange} />
            <Dragger onFile={this.onFile} />
          </div>

          {/* <div className="lg:w-full xl:w-1/3"> */}

          <div className="md:w-full lg:w-2/3 xl:w-1/3">
            <TaskList onDL={this.onDL} />
          </div>
        </div>

        <div className="sticky bottom-0 w-full h-1 z-20 overflow-x-hidden">
          <div ref={this.progressref} className="rounded-xl w-0 progressbar h-full duration-500"></div>
        </div>
        {/* <button className="rounded-xl bg-white p-2" onClick={() => {
        }}>debug</button> */}
        <footer>
          <button className="rounded-xl px-2 bg-white dark:bg-gray-900" onClick={
            () => {
              this.setState({ showlogin: !this.state.showlogin })
              this.loginref.current.value = ""
            }}> share </button>
          <input autoFocus ref={this.loginref} className={this.state.showlogin ? "" : "hidden"} onChange={(e) => {
            global.User.onChange(e, () => {
              this.setState({ showlogin: false })
            })
          }} />
          {global.User.uid}
        </footer>
      </div>
    );
  }
}

export default App;
