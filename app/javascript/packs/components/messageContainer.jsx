import React,{ Component } from 'react'

export default class MessageContainer extends Component{

  render(){
    return(
      <div className='container-fluid'>
        <div className='row justify-content-center p-3'>
          <div className='col-6'>
            <div className="card message-container-card" >
              <div className="card-header">
                <div className='row justify-content-around text-white'>
                  <div className='col'>Sender</div>
                  <div className='col text-center'>Subject</div>
                  <div className='col text-right'>View</div>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className='row'>
                    <div className='col'>
                      <span className='rounded-circle mail-active'></span>
                      bisho silwal<br/>
                      <small>test@gmail.com</small>
                    </div>
                    <div className='col text-center'>
                      I send mail
                    </div>
                    <div className='col text-right'>
                        >
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}