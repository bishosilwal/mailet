import React,{ Component } from 'react'

export default class Message extends Component{
  state = {
    message: this.props.message
  }

  componentWillUpdate(prevProps, prevState, snapshot) {
    if(prevProps.message != prevState.message) {
      this.setState({...prevState, message: prevProps.message})
    }
  }

  render(){
    var message = this.state.message;
    if(message) {
      return(
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <img href='' alt='image'/> Bisho silwal
              {message}
            </div>
            <div className='col-6'>
              Date: Fri, 05 Jun 2020
            </div>
          </div>
          <div className='row'>
            <div className='col-12 pt-3 p-2'>
              subject: test email
            </div>
            <div className='col-12 pt-3 p-2'>
              This is the body of the mail
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className='container'>
          <div className='row'>
            No messages
          </div>
        </div>
      )
    }
  }
}