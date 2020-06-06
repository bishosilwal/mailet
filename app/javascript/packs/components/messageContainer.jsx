import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';

class MessageContainer extends Component{
  state = {
    messages: [],
    emails: this.props.emails || [],
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.emails != this.state.emails) {
      this.setState({emails: nextProps.emails})
    }
  };

  messageClicked = e => {
    var emails = this.state.emails;
    var messages = emails.find(m => m.from == e.target.innerText).messages;
    this.setState({...this.state, messages: messages});
  };

  render(){
    var {messages, emails} = this.state;
    const messageList = (
      <ul>
        {emails.map(m =>
          <li key={m.from} onClick={this.messageClicked}>{m.from}</li>
        )}
      </ul>
    )
    return(
      <div className='container-fluid'>
        <div className='row justify-content-center p-3'>
          <div className='col-10'>
            <div className="card message-container-card" >
              <div className="card-header">
                <div className='row justify-content-around text-white'>
                  <div className='col'>Sender</div>
                  <div className='col text-center'>Subject</div>
                  <div className='col text-right'>View</div>
                </div>
              </div>

              <div className='card-body'>
                <div className='row'>
                  <div className='col-4 message-list'>
                    <div className='row'>
                      {messageList}
                    </div>
                  </div>
                  <div className='col-8'>
                    <Message messages={messages}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    emails: state.emailReducer.emails
  }
};
export default connect(mapStateToProps, null)(MessageContainer);