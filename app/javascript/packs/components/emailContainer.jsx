import React,{ Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import axios from 'axios';
import $ from 'jquery';
import toastr from 'toastr';
import '../store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

window.toastr = toastr;

const token = $("meta[name='csrf-token']").attr('content');

class EmailContainer extends Component{
  state = {
    tempMail: this.props.tempMail || '',
  };

  UNSAFE_componentWillMount() {
    var that = this;
    axios({
      method: 'post',
      url: '/mail_address',
      data: {
        mail_address: this.props.tempMail.mail
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      }
    }).then(function(res) {
      that.props.newMailAddress(res.data.new_mail);
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  };

  copyToClipboard(mail, e) {
    e.preventDefault();
    e.stopPropagation();
     navigator.clipboard.writeText(mail).then(function() {
       toastr.success('Copied to clipboard', '', {'toastClass': 'toastr-success'});
      /* clipboard successfully set */
    }, function() {
       console.log('Copied to clipboard failed')
      /* clipboard write failed */
    });
  };

  render(){
    const { tempMail } = this.state;
    return(
      <div className='container-fluid email-container text-white'>
        <div className='row justify-content-center'>
          <div className='col-12 mt-2 text-center text-light'>
            <h1>
              Temporary Disposable Email Address
            </h1>
          </div>
          <div className='col-12'>
            <div className='row justify-content-center pb-0 pl-3 pr-3'>
              <div className='col-md-3 col-sm-12 pr-0 pl-0 w-sm-40 w-l-40 w-sm-45-70'>
                <div className='row temp-email-div rounded-pill m-3 pl-2'>
                  <div className='col-8 mail' data-toggle="tooltip" data-placement="bottom" title="Your Temporary Email Address">
                    <span className='text-dark mail'>{tempMail.mail}</span>
                  </div>
                  <div className='col-4 p-0 text-right'>
                    <div className='btn btn-primary rounded-circle copy-clipboard' onClick={ e => this.copyToClipboard(tempMail.mail, e) } data-toggle="tooltip" data-placement="right" title="Copy to clipboard">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dae1e7" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row justify-content-center p-2'>
              <div className='col-md-8 w-sm-60 w-l-60 w-sm-45-90'>
                <h2>
                  <p className='text-muted mail-desc'>Ready to use email address to send and receive mail from any sites. You don't have to worry about the spam emails in your personal mailbox, your
                    online privacy, giving away your personal email address to other company. Generated fake random email address will be deleted after you leave the page.</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newMailAddress: (address) => dispatch({type: 'TEMP_MAIL_ADDRESS_CREATE', value: address})
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tempMail: state.tempMail
  }
}

const Container =  connect(mapStateToProps, mapDispatchToProps)(EmailContainer)


$(document).on('ready DOMContentLoaded turbolinks:load', function() {
  if(document.getElementById('main-app-email')) {
    ReactDOM.render(
      <Provider store={window.store}>
        <PersistGate persistor={window.persistor}>
          <Container />
        </PersistGate>
      </Provider>,
      document.getElementById('main-app-email')
    )
  }
});