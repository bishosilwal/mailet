import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';

class MessageContainer extends Component{
  state = {
    selectedMessages: [],
    from: null,
    emails: this.props.emails || [],
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.emails != this.state.emails) {
      this.setState({emails: nextProps.emails})
    }
  };

  messageClicked = e => {
    var emails = this.state.emails;
    var selectedMessages = emails.find(m => m.from == e.target.dataset.from).messages;
    this.setState({...this.state, selectedMessages: selectedMessages, from: e.target.dataset.from});
  };

  render(){
    var {selectedMessages, emails, from} = this.state;
    const messageList = (
      <ul>
        {emails.map(m =>
          <li key={m.from} onClick={this.messageClicked} data-from={m.from}>{m.from}    count:{m.messages.length}</li>
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
                    <Message selectedMessages={selectedMessages} from={from}/>
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