import * as React from "react";
// import './App.css'
// import './pages/minh.css'
import Slider from './utils/Slider'
import Example from './pages/upload'


const Header = () => {
  return (
    <>
      <div className="header">
        <h1>图像处理-目前只有超分功能</h1>
      </div>
    </>
  )
}
const Footer = () => {
  return (
    <>
      <div className="footer">
        <hr />
        <footer>
          LUX Attempt 2021.09
        </footer>
      </div>
    </>
  )
}


class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      uploading: false,
      progress: 0
    }
  }

  onClick = () => {
    //handle upload
  }

  images = () => {
    //list cards
  }

  progressor = () => {
    this.setState({
      progress: this.state.progress + 1,
      uploading: false
    })
  }

  finisher = () => {
    if (this.state.files.length <= this.state.progress) {
      this.setState({
        progress: 0,
        uploading: false
      })
    }
  }

  render() {
    return (
      <div>
        {/* {this.state.uploading ? <AutorenewIcon /> : <CloudUploadIcon />} */}
        <div>
          {this.images()}
        </div>
      </div>
    )
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.workers = [
      { name: "RealESRGan", disabled: false },
      { name: "USRGan", disabled: false },
      { name: "coming sonn", disabled: true }
    ]
    this.params = {
      "RealESRGan": { sf: { min: 2, max: 4, def: 4, step: 1 } },
      "USRGan": {
        sf: { min: 2, max: 4, def: 2, step: 1 },
        noise: { min: 0, max: 16, def: 2, step: 0.1 },
        kw: { min: 0, max: 16, def: 0, step: 0.1 },
      },
    }
    this.state = {
      name: "RealESRGan"
    }
  }

  // onClick = (name) => {
  //   this.setState({ 'name': name })
  // }

  sliders = (name) => {
    let params = this.params[name]
    let final = []
    for (let p in params) {
      console.log(p)
      final.push(
        <Slider
          min={params[p].min}
          max={params[p].max}
          de={params[p].def}
          step={params[p].step}
          name={params[p].name}
          onChange={(value) => { console.log(value) }}
          thin
        />
      )
    }
    return final
  }

  MyTabs() {
    return ({}
    )
  }


  Workerbutton = (onClick, disabled, name) => {
    return ({}
      // <button onClick={onClick} disabled={disabled}>{name}</button>
    )
  }

  render() {
    return (
      this.MyTabs()
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Example />
        <Footer />
      </>
    )
  }
}
export default App


