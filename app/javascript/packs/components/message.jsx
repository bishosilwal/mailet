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
                <div className='col-12 pt-3'>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                      <span className='font-weight-bolder'>To:</span>
                    </label>
                    <div className="col-sm-10">
                      <input type="email" name='receiver_email' className="form-control" id="email" placeholder='Enter receiver email' />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="cc" className="col-sm-2 col-form-label">
                      <span className='font-weight-bolder'>CC:</span>
                    </label>
                    <div className="col-sm-10">
                      <input type="email" name='receiver_cc' className="form-control" id="cc" placeholder='Enter email' />
                    </div>
                  </div>
                </div>
                <div className='col-12 p-3'>
                  <div className="form-group row">
                    <label htmlFor="subject" className="col-sm-2 col-form-label">
                      <span className='font-weight-bolder'>Subject:</span>
                    </label>
                    <div className="col-sm-10">
                      <input type="text" name='subject' className="form-control" id="subject" placeholder='Enter mail subject' />
                    </div>
                  </div>
                </div>
                <div className='col-12 p-3 pt-0'>
                  <div className="form-group">
                    <textarea className="form-control" name='body' rows="3" placeholder='Enter message'></textarea>
                  </div>
                </div>
                <div className='col-12 '>
                  <button className='btn btn-success float-right'>Send</button>
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