import React,{ Component } from 'react'
import Message from './message'
export default class MessageContainer extends Component{
  state = {
    message: 'hello world'
  }

  messageClicked = e => {
    this.setState({...this.state, message: e.target.innerText});
  }
  render(){
    var message = this.state.message;
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
                      <ul>
                        <li onClick={this.messageClicked}>
                          test@gmail.com
                        </li>
                        <li onClick={this.messageClicked}>
                          test1@gmail.coim
                        </li>
                      </ul>
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