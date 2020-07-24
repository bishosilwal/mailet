import React,{ Component } from 'react';
import { connect } from 'react-redux';
import CustomIframe from './customIframe';
import EmailMessageCreator from "./emailMessageCreator";

class Message extends Component{
  state = {
    selectedMessages: this.props.selectedMessages || [],
    createNewMessage: this.props.createNewMessage,
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  }

  formatDateTime(date) {
    date = new Date(date);
    date = date.toDateString() + ' ' + date.toLocaleTimeString();
    return date;
  }

  render() {
    var {selectedMessages, createNewMessage} = this.state;
    var scrollable = selectedMessages.length >= 4 ? true : false;

    const scrollableMessageStyles = scrollable ? {
      height: '1000px',
      overflowY: 'scroll',
    } : {}

    const messagesList =
      <div className={'row m-1 ' + scrollable ? 'row p-4' : ''} style={scrollableMessageStyles} ref={(el) =>{ this.messagesList = el }}>
        {selectedMessages.map(message =>
          <div className='col-12 shadow-lg p-3 mb-3 bg-white rounded' key={message.id}>
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
              <div className='col-12 mb-1'>
                <span className='font-weight-bolder'>To: </span><span>{message.to}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 p-3 border-top border-bottom border-light'>
                <span className='font-weight-bolder'>Subject: </span>
                {message.subject}
              </div>
              <div className='col-12 p-3'>
                <CustomIframe content={message.body} />
              </div>
            </div>
          </div>
        ) }
      </div>

    if(scrollable) {
      this.messagesList.scrollIntoView();
    }
    if(selectedMessages.length != 0 || createNewMessage) {
      return(
        <div className='container'>
          {(createNewMessage) ? '' : messagesList}
          <div className='row m-1'>
            <EmailMessageCreator />
          </div>
        </div>
      )
    } else {
      return(
        <div className='container'>
          <div className='row p-5 text-center'>
            No messages
          </div>
        </div>
      )
    }
  }
}

const mapsStateToProps = (state) => {
  const from = state.emailReducer.from;
  var messages = state.emailReducer.emails.filter(m => m.from === from)[0];
  if(typeof(messages) == 'undefined') {
    messages = [];
  } else {
    messages = messages.messages
  }
  return {
    selectedMessages: messages,
    createNewMessage: state.emailReducer.createNewMessage
  }
};
export default connect(mapsStateToProps, null)(Message);