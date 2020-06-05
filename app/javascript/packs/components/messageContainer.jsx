import React,{ Component } from 'react'
import Message from './message'
export default class MessageContainer extends Component{
  state = {
    message: {},
    allMessage: [{
      id: 1,
      to: 'receiver@gmail.com',
      from: 'sender@gmail.com',
      subject: 'test message',
      body: 'This is the body of message'
    },
      {
        id: 2,
        to: 'receiver1@gmail.com',
        from: 'sender1@gmail.com',
        subject: 'test1 message',
        body: 'This is the body of message'
      }
    ],
  };

  messageClicked = e => {
    var allMessage = this.state.allMessage;
    var message = allMessage.find(m => m.from == e.target.innerText);
    this.setState({...this.state, message: message});
  };

  render(){
    var {message, allMessage} = this.state;
    const messageList = (
      <ul>
        {allMessage.map(m =>
          <li key={m.id} onClick={this.messageClicked}>{m.from}</li>
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
                    <Message message={message}/>
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