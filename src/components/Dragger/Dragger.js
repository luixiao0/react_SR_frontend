import React from 'react';

class Dragger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploading: false,
      error: false,
      progressInfos: 0,
      hover: false
    }
    this.fileRef = React.createRef()
    this.fileHandle = props.onFile
  }
  dropHandler = (ev) => {
    ev.preventDefault();
    console.log('preventdrop')
    this.setState({ uploading: true })
    this.fileHandle(ev.dataTransfer.files, this.progressSet)
  }
  dragEnter = (ev) => {
    ev.preventDefault();
    console.log('preventdragenter')
    this.setState({ hover: true })
  }
  dragExit = (ev) => {
    ev.preventDefault();
    console.log('preventdragexit')
    this.setState({ hover: false })
  }

  onClick = (ev) => {
    this.setState({ hover: true })
    this.hovert = setTimeout(() => {
      this.setState({ hover: false })
    }, 1000);

    // if (this.state.uploading) {
    //   ev.preventDefault();
    //   return
    // }
    // this.setState({ uploading: true })
    this.fileRef.current.click()
  }

  fileRefclicked = (ev) => {
    clearTimeout(this.hovert)
    if (ev.target.files.length) {
      this.setState({ hover: true, uploading: true })
      this.fileHandle(ev.target.files, this.progressSet)
    }
  }

  progressSet = (progress) => {
    if (progress === 100) {
      console.log(progress, 'fin')
      this.setState({
        uploading: false,
        error: false,
        hover: false,
        progressInfos: 0,
      })
      this.fileRef.current.value = null
    }
    else if (progress === -1) {
      console.log(progress, 'err')
      this.setState({
        uploading: false,
        error: true,
        progressInfos: 0,
        hover: false
      })
      this.fileRef.current.value = null
    }
    else {
      console.log(progress)
      this.setState({
        progressInfos: progress,
      })
    }
  }

  classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  render() {
    let stat =
      <>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg><div className="mx-2"><p className="subpixel-antialiased"><strong >Choose files</strong> or drag it here.</p></div>
      </>
    let style = `duration-300 ${this.props.dark ?'bg-gray-700': 'bg-white' } shadow-sm`
    if (this.state.hover) {
      style = "duration-100 bg-gray-300 shadow-inner"
    }

    let color = ""
    if (this.state.uploading) {
      if (!this.state.error) {
        stat = <strong>uploading</strong>
        color = "bg-gray-100"
      }
      else {
        stat = <strong>error</strong>
        color = "bg-red-400"
      }
    }
    style = this.classNames("w-full z-10 rounded-xl py-9 px-2", style, color)

    return (
      <div className="w-full px-2 top-10 mt-3" onDragOver={this.dragEnter} onDragLeave={this.dragExit} onDrop={this.dropHandler} onClick={this.onClick}>
        <div className={style}>
          <input style={{ display: "none" }} type="file" ref={this.fileRef} onChange={this.fileRefclicked} name="files[]" id="file" multiple />
          <div className={this.state.uploading ? "animate-pulse uploader text-center select-none flex justify-center" : "uploader text-center select-none flex justify-center"}>
            {stat}
          </div>
        </div>
      </div>
    )
  }
}

export default Dragger