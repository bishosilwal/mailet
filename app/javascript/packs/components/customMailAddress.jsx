import React, { Component } from 'react';
import axios from "axios";
import {connect} from "react-redux";

const token = window.$("meta[name='csrf-token']").attr('content');

class CustomMailAddress extends Component {
  state = {
    tempMail: this.props.tempMail,
    customMailAddress: '',
    customMailValid: true,
    addressValidationMsg: ''
  };

  handleCustomMailChange = e => {
    this.setState({customMailAddress: e.target.value})
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
        // that.setState({customMailAddress: '', customMailValid: true});
        toastr.success(res.data.message, res.data.details, {'toastClass': 'toastr-success'});
      }).catch(function(error) {
        var msg = Object.values(error.response.data).join();
        toastr.error(msg);
        that.setState({customMailValid: false, addressValidationMsg: msg});
      });
    } else {
      this.setState({customMailValid: false, addressValidationMsg: "Please enter custom name. Valid characters include: !#$%&'*+-/=?^_\{|}~"});
    }
  };

  customMailPlaceholder() {
    var { tempMail } = this.state;
    tempMail = tempMail.mail;
    return tempMail.slice(tempMail.lastIndexOf('@'));
  };

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render() {
    var { customMailAddress, customMailValid, addressValidationMsg } = this.state;

    return(
      <div className='col-md-12 col-sm-12 custom-mail-address'>
        <div className='row p-md-5'>
          <div className='col-md-10 col-sm-12 text-center'>
            <h5 className='text-primary'>Create custom mail address.</h5>
          </div>
          <div className='col-md-12 col-sm-12 pt-md-3'>
            <div className='row justify-content-center'>
              <div className='col-md-8 col-sm-12'>
                <div className='row'>
                  <div className='col-md-9 col-sm-12'>
                    <div className='row'>
                      <label htmlFor="customMailAddress" className="col-md-3 col-sm-3 col-form-label">
                        <span className='font-weight-bolder'>Email:</span>
                      </label>
                      <div className="col-md-9 col-sm-9">
                        <input type="text" name='to' value={customMailAddress} className={"form-control " + `${customMailValid ? '' : 'is-invalid'}` } id="customMailAddress" placeholder={this.customMailPlaceholder()} onChange={this.handleCustomMailChange} required={true}/>
                        <div className="invalid-feedback" >
                          {addressValidationMsg}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-12'>
                    <div className='row text-right'>
                      <div className='col-md-12 col-sm-12 text-left'>
                        <button className='btn btn-outline-primary' onClick={this.handleCustomMailSubmit}>Submit</button>
                      </div>
                    </div>
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
    tempMail: state.emailReducer.tempMail,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    customMailAddressCreated: email => dispatch({ type: 'TEMP_MAIL_ADDRESS_CREATE', value: email}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomMailAddress);
