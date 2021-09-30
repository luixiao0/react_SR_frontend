import React from "react"
import './TaskList.css'
import Taskcard from "./TaskCard"

function DummyTaskcard(props) {
  return (
    <>
      <div key={props.id} className='dark:bg-gray-900 bg-white duration-100 rounded-xl py-4 text-center select-none' >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-1/2 m-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>

        <>No task yet.</>
      </div>
    </>
  )
}


export default class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      files: []
    }
  }
  refresh = () => {
    this.setState({ loading: true })
    global.User.get_tasks((value) => {
      console.log(value)
      this.setState({
        loading: false,
        files: value
      })
    })
    // console.log(this.state)
  }

  componentDidMount() {
    this.refresh()
    this.t = setInterval(this.refresh, 5000)
  }
  componentWillUnmount() {
    clearInterval(this.t)
  }
  card_dummy(DL) {
    // console.log(this.state.files)
    if (this.state.files.length) {
      return (this.state.files.map((obj) => {
        // console.log(obj)
        return (<Taskcard key={obj.id} id={obj.id} state={obj.s} params={obj.p} date={obj.date} name={obj.name} DL={DL}/>);
      }))
    }
    else {
      return (<DummyTaskcard/>)
    }
  }

  render() {
    // console.log(this.state.files)
    return (
      <div className="w-full">
        <div className='dark:bg-gray-700 bg-white shadow-sm rounded-xl mt-2 p-1 mx-2 duration-100'>
          {/* <button className="bg-gray-100 p-1 shadow-sm rounded-xl" onClick={this.refresh}>refresh</button> */}
          {this.card_dummy(this.props.onDL)}
        </div>
      </div>
    )
  }
}