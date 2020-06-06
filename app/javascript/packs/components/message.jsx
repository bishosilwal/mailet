import React,{ Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component{
  state = {
    messages: this.props.selectedMessages || [],
    from: this.props.from
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.selectedMessages != this.props.selectedMessages) {
      this.setState({messages: nextProps.selectedMessages});
    }
  }
  formatDateTime(date) {
    date = new Date(date);
    date = date.toDateString() + ' ' + date.toLocaleTimeString();
    return date;
  }
  render() {
    var messages = this.state.messages;
    console.log(messages)
    const messagesList = messages.map(message =>
      <div className='col-12 shadow-lg p-3 mb-5 bg-white rounded' key={message.id}>
        <div className='row'>
          <div className='col-6'>
            <span className='font-weight-bolder'>From:</span> <span>{message.from} </span>
          </div>
          <div className='col-6'>
            <p className='float-right'>
              <span className='font-weight-bolder'>Date: </span>
              <span>{this.formatDateTime(message.created_at)}</span>
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 pt-3 p-2'>
            <hr/>
            <span className='font-weight-bolder'>Subject: </span>
            {message.subject}
            <hr/>
          </div>
          <div className='col-12 pt-3 p-2'>
            {message.body}
          </div>
        </div>
      </div>
    )
    if(messages.length != 0) {
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

const mapsStateToProps = (state, ownProps) => {
  var messages = state.emailReducer.emails.filter(m => m.from === ownProps.from)[0];
  if(typeof(messages) == 'undefined') {
    messages = [];
  } else {
    messages = messages.messages
  }
  return {
    selectedMessages: messages,
    from: ownProps.from
  }
};
export default connect(mapsStateToProps, null)(Message);