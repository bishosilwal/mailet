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

  render() {
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