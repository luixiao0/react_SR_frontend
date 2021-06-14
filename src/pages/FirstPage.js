import React from 'react'
import './minh.css'


class FirstPage extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        if (this.props.logout){
            console.log('out')
            global.CurrentUser.logout()
        }
        return(
            <div className='content'>
                TEST
            </div>
        )
    }
}

export default FirstPage
