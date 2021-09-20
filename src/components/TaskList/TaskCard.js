
import React from "react"
import LazyLoad from 'react-lazyload';
import { Transition } from '@headlessui/react'
import { useState } from 'react'

import * as dayjs from 'dayjs'
dayjs.extend(require('dayjs/plugin/relativeTime'))
dayjs.extend(require('dayjs/plugin/utc'))
dayjs.extend(require('dayjs/plugin/updateLocale'))
dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'few sec',
    m: "1 min",
    mm: "%d min",
    h: "1 h",
    hh: "%d hrs",
    d: "1 d",
    dd: "%d d",
    M: "1 mon",
    MM: "%d mon",
    y: "a yr",
    yy: "%d yrs"
  }
})

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blob: ""
    }
  }
  shouldComponentUpdate(prop, state) {
    if (prop.id !== this.props.id) {
      this.fetch()
      return true
    }
    else {
      if (this.state.blob) {
        return false
      }
      return true
    }
  }
  componentDidMount() {
    this.fetch()
  }

  fetch() {
    global.User.get_preview(this.props.id, (value) => { this.setState({ blob: value }) })
  }

  render() {
    let blur = ""
    if (this.props.state !== 1) {
      blur = "filter blur-xs"
    }
    if (this.props.state <= 0) {
      blur = "filter brightness-50"
    }
    return (
      <img className={blur + " w-full rounded-l-xl"} src={this.state.blob} alt="" />
    )
  }
}


function params(param, id) {
  let capsule = []
  let normal = []
  // console.log(param)
  for (let p in param) {
    switch (p) {
      case "sf":
        capsule.push(<div className="zoom mr-2 flex shadow-sm rounded-xl bg-gray-200 p-1 bottom-1 right-0 text-xs sm:text-lg xl:text-xl" key={p}>
          {param[p]}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 sm:h-3 sm:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>)
        break
      case "anime":
        if (param[p]) {
          capsule.push(<div key={p} className="anime mr-2 shadow-sm rounded-xl bg-gray-200 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>)
        }
        else {
          capsule.push(<div key={p} className="real mr-2 text-center shadow-sm rounded-xl bg-gray-200 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>)
        }
        break
      default:
        normal.push(<div className="rounded-xl bg-white px-2 mr-1 z-20" key={p}>{p}:{param[p]}</div>)
    }
  }

  return (
    <>
      <div className="flex text-center my-1">
        {capsule.map((value, index) => { return value })}
      </div>
      <div className="flex">
        {normal.map((value, index) => { return value })}
      </div>
    </>
  )
}



function Taskcard(props) {
  let date = dayjs.unix(props.date).utc('z').local().fromNow()
  const [isShowing, setIsShowing] = useState(false)
  const [show, setShow] = useState(true)
  let state
  switch (props.state) {
    case 0:
      state = "bg-white dark:bg-gray-900"
      break;
    case 1:
      state = "bg-green-100"
      break;
    case 3:
      state = "bg-white dark:bg-gray-900"
      break;
    case 2:
      state = "proccessing-color"
      break;
    case -1:
      state = "bg-red-300"
      break;
    default:
      state = "bg-gray-100"//for code 0 and -2
  }
  let DlTask = () => {
    props.DL(props.id)
  }
  let DelTask = () => {
    setShow(false)
    global.User.DelTask(props.id, () => { })
  }

  if (!show) {
    return null
  }

  let deletesvg = <svg
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    className="w-full m-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
  return (
    <>
      <div key={props.id} className={state + " flex duration-300 shadow rounded-xl select-none parent my-2 mx-1"}
        onClick={() => setIsShowing((isShowing) => !isShowing)}>
        <LazyLoad className="w-3/8" height={75} offset={300}>
          <Image state={props.state} id={props.id} />
        </LazyLoad>
        <div className={state + " w-5/8 rounded-xl  text-right"}>

          <Transition
            show={isShowing}
            className="child1 rounded-xl bg-white dark:bg-gray-900 flex py-2"
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transform duration-100 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-0"
          >
            <button className="w-3/8">
              <svg xmlns="http://www.w3.org/2000/svg" height="100%" className="w-full m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {props.state === 1 ?
              <>
                <button className="w-5/16 " onClick={DelTask}>{deletesvg}</button>
                <button className="w-5/16 " onClick={DlTask}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="100%" className="w-full m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </> :
              <button className="w-5/16 " onClick={DelTask}>{deletesvg}</button>
            }
          </Transition>


          <Transition
            show={!isShowing}
            className="mx-2 h-full relative text-xs md:text-sm lg:text-base xl:text-lg "
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 scale-100 "
            leaveTo="opacity-0 scale-90 "
          >
            {params(props.params, props.id)}
            {/* <div className="text-xs text-right"> */}
            <div className="absolute md:text-xs lg:text-base xl:text-lg bottom-1 right-0 z-10">
              {/* <span className="self-end"> */}
              {date}
              {/* </span> */}
            </div>
            {/* </div> */}
          </Transition>
        </div>
      </div>
    </>
  )
}

export default Taskcard