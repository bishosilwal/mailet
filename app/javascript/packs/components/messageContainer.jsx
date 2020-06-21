import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';

import Message from './message';

const token = window.$("meta[name='csrf-token']").attr('content');

class MessageContainer extends Component{
  state = {
    from: this.props.from,
    emails: this.props.emails || [],
    tempMail: this.props.tempMail,
    createNewMessage: this.props.createNewMessage,
    changeMailAddress: this.props.changeMailAddress,
    customMailAddress: '',
    customMailValid: true,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  };

  messageClicked = e => {
    this.props.fromChanged(e.target.dataset.from);
  };

  handleCustomMailChange = e => {
    this.setState({customMailAddress: e.target.value})
  };

  customMailPlaceholder() {
    var { tempMail } = this.state;
    tempMail = tempMail.mail;
    return tempMail.slice(tempMail.lastIndexOf('@'));
  };

  handleCustomMailSubmit = _ => {
    var that = this;
    var { customMailAddress, tempMail } = this.state;
    tempMail = tempMail.mail;
    var domain = tempMail.slice(tempMail.lastIndexOf('@'));
    var mail = customMailAddress + domain;
    if(this.validateEmail(mail)) {
      axios.post('/mail_address/create/custom', {
        mail: mail
      }, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': token
        }
      }).then(function (res) {
        that.props.customMailAddressCreated(res.data.new_mail);
        that.setState({customMailAddress: '', customMailValid: true});
        toastr.success(res.data.message, res.data.details, {'toastClass': 'toastr-success'});
      }).catch(function(error) {
        var msg = Object.values(error.response.data).join();
        toastr.error(msg);
      });
    } else {
      this.setState({customMailValid: false});
    }
  };

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  renderContent() {
    var { emails, from, createNewMessage, changeMailAddress, customMailAddress, customMailValid } = this.state;
    const emailAddressList = (
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        {emails.map(m =>
          <a className="nav-link border border-secondary rounded-0 mb-2" id="v-pills-message-tab" data-toggle="pill" href="#v-pills-message" role="tab"
             aria-controls="v-pills-message" aria-selected={from == m.from ? 'true' : 'false'} data-from={m.from} onClick={this.messageClicked} key={m.from}>
            {m.from}  <span className='badge badge-success float-right'>{m.messages.length}</span>
          </a>
        )}
      </div>
    )

    if(changeMailAddress) {
      return(
        <div className='col-12 row p-5'>
          <div className='col-10 text-center'>
            <h5 className='text-primary'>Create custom mail address.</h5>
          </div>
          <div className='col-12 pt-3 row justify-content-center'>
            <div className='col-8'>
              <div className='row'>
                <div className='col-9 row'>
                  <label htmlFor="customMailAddress" className="col-sm-3 col-form-label">
                    <span className='font-weight-bolder'>Email:</span>
                  </label>
                  <div className="col-sm-9">
                    <input type="text" name='to' value={customMailAddress} ref={(el) => this.customMail = el} className={"form-control " + `${customMailValid ? '' : 'is-invalid'}` } id="customMailAddress" placeholder={this.customMailPlaceholder()} onChange={this.handleCustomMailChange} required={true}/>
                    <div className="invalid-feedback">
                      Please enter custom name. Valid characters include: {"!#$%&'*+-/=?^_\{|}~"}
                    </div>
                  </div>
                </div>
                <div className='col-3 row'>
                  <div className='col-12 text-left'>
                    <button className='btn btn-outline-primary' onClick={this.handleCustomMailSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      if(emails.length === 0 && !createNewMessage) {
        return(
          <div className='col-12'>
            <div className='row justify-content-center p-5 m-5'>
              <div className='col-12 text-center'>
                <PulseLoader
                  size={15}
                  color={"#142850"}
                  loading={true}
                  margin={2}
                />
                <h6 className='text-secondary mt-2'>
                  You have received 0 emails.<br/>
                  <span className='text-light'>Waiting for incoming emails.</span>
                </h6>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className='col-12 row'>
            <div className='col-4 p-2 address-list'>
              {emailAddressList}
            </div>
            <div className='col-8 p-1'>
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-message" role="tabpanel"
                     aria-labelledby="v-pills-message-tab">
                  <Message />
                </div>
              </div>
            </div>
          </div>
          )
      }
    }
  }
  render(){
    return(
      <div className='container-fluid'>
        <div className='row justify-content-center p-3'>
          <div className='col-10'>
            <div className="card message-container-card" >
              <div className="card-header">
                <div className='row justify-content-around text-light'>
                  <div className='col'>Address</div>
                  <div className='col '>Emails</div>
                </div>
              </div>
              <div className='card-body p-0'>
                <div className='container'>
                  <div className='row'>
                    {this.renderContent()}
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
    emails: state.emailReducer.emails,
    from: state.emailReducer.from,
    createNewMessage: state.emailReducer.createNewMessage,
    changeMailAddress: state.emailReducer.changeMailAddress,
    tempMail: state.emailReducer.tempMail,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fromChanged: email => dispatch({type: 'EMAIL_SELECTED', value: email}),
    customMailAddressCreated: email => dispatch({ type: 'TEMP_MAIL_ADDRESS_CREATE', value: email}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);