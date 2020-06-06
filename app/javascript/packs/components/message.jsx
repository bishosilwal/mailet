import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Message extends Component{
  state = {
    messages: this.props.selectedMessages || [],
    from: this.props.from,
    newMessage: {
      subject: '',
      body: ''
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.selectedMessages != this.props.selectedMessages) {
      this.setState({messages: nextProps.selectedMessages, from: nextProps.from});
    }
  }
  formatDateTime(date) {
    date = new Date(date);
    date = date.toDateString() + ' ' + date.toLocaleTimeString();
    return date;
  }

  sendMessage = (e) => {
    var that = this;
    var newMessage = this.state.newMessage;
    newMessage['to'] = this.state.from;
    newMessage['from'] = 'test@gmail.com';
    var token = window.$("meta[name='csrf-token']").attr('content');
    axios.post('/send_email', {
      new_message: newMessage
    },{
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      }
    })
      .then(function (res) {
        that.setState({newMessage: {subject: '', body: ''}});
        toastr.success(res.data.message, res.data.details)
      })
  }

  handleChange = (e) => {
    var newMessage = this.state.newMessage;
    newMessage[e.target.name] = e.target.value;
    this.setState({newMessage: newMessage})
  }

  render() {
    var {messages, newMessage} = this.state;
    var scrollable = messages.length === 3 ? true : false;
    const scrollableMessageStyles = scrollable ? {
      height: '500px',
      overflowY: 'scroll',
    } : {}
    const messagesList =
      <div className={'row m-1 ' + scrollable ? 'p-2' : ''} style={scrollableMessageStyles} ref={(el) =>{ this.messagesList = el }}>
        {messages.map(message =>
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
            </div>
            <div className='row'>
              <div className='col-12 p-3 border-top border-bottom border-light'>
                <span className='font-weight-bolder'>Subject: </span>
                {message.subject}
              </div>
              <div className='col-12 p-3'>
                {message.body}
              </div>
            </div>
          </div>
        ) }
      </div>

    if(scrollable) {
      this.messagesList.scrollIntoView();
    }
    if(messages.length != 0) {
      return(
        <div className='container'>
          {messagesList}
          <div className='row m-1'>
            <div className='col-12 shadow-lg p-3 pt-0 mb-5 bg-white rounded'>
              <div className='row'>
                <div className='col-12 p-3'>
                  <div className="form-group row">
                    <label htmlFor="subject" className="col-sm-2 col-form-label">
                      <span className='font-weight-bolder'>Subject:</span>
                    </label>
                    <div className="col-sm-10">
                      <input type="text" name='subject' value={newMessage.subject} className="form-control" id="subject" placeholder='Enter mail subject' onChange={this.handleChange} />
                    </div>
                  </div>
                </div>
                <div className='col-12 p-3 pt-0'>
                  <div className="form-group">
                    <textarea className="form-control" value={newMessage.body} onChange={this.handleChange} name='body' rows="3" placeholder='Enter message'></textarea>
                  </div>
                </div>
                <div className='col-12 '>
                  <button className='btn btn-success float-right' onClick={this.sendMessage}>Send</button>
                </div>
              </div>
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