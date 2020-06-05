import React,{ Component } from 'react'

export default class Message extends Component{
  state = {
    message: this.props.message
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.message != this.props.message) {
      this.setState({message: nextProps.message})
    }
  }

  render(){
    var message = this.state.message;
    if(Object.keys(message).length !=0) {
      return(
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <img href='' alt='image'/> Bisho silwal
              {message.from}
            </div>
            <div className='col-6'>
              Date: Fri, 05 Jun 2020
            </div>
          </div>
          <div className='row'>
            <div className='col-12 pt-3 p-2'>
              subject: {message.subject}
            </div>
            <div className='col-12 pt-3 p-2'>
              {message.body}
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