import React,{ Component } from 'react'

export default class Message extends Component{
  state = {
    messages: this.props.messages || []
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.messages != this.props.messages) {
      this.setState({messages: nextProps.messages})
    }
  }

  render(){
    var messages = this.state.messages;
    const messagesList = messages.map(message =>
      <div className='col-12' key={message.id}>
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
    if(Object.keys(messages).length !=0) {
      return(
        <div className='container'>
          {messagesList}
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