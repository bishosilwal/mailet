import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from "react-redux";
import EmailMessageCreator from "./emailMessageCreator";
import '../store/configureStore'

class MailSender extends Component {
  render() {
    return(
      <div className='container-fluid'>
        <div className='row justify-content-center p-3 pb-4'>
          <div className='col-md-12 col-sm-12'>
            <h5>
              <span className='text-primary font-italic font-weight-light note'>*Note: Incoming mail is updated automatically</span>
            </h5>
          </div>
          <div className='col-md-12 col-sm-12 message-container'>
            <div className="card message-container-card" >
              <div className="card-header">
                <div className='row justify-content-around text-light'>
                  <div className='col'>Mail send form</div>
                </div>
              </div>
              <div className='card-body p-0'>
                <div className='container'>
                  <div className='row'>
                    <EmailMessageCreator createMail={true} />
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

ReactDOM.render(
  <Provider store={window.store}>
    <PersistGate persistor={window.persistor}>
      <MailSender />
    </PersistGate>
  </Provider>,
  document.getElementById('main-app-body')
)