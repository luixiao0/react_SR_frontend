import React from 'react'

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: "",
    }
  }
  setter = (file) => {
    this.setState({
      img: file,
    })
  }
  componentDidMount() {
    if (!this.state.img) {
      global.CurrentUser.get_preview(this.props.id, this.setter)
    }
  }
  render() {
    return (
      <img className="images" src={this.state.img} alt="" />
    )
  }
}
export default Image
