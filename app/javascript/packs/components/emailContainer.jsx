import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const token = window.$("meta[name='csrf-token']").attr('content');

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

  createMessage = _ => {
    this.props.createNewMessage(true);
  };

  handleDelete = _ => {
    var that = this;
    var tempMail = this.state.tempMail;
    axios.delete('/mail_address/', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      },
      data: {
        mail: tempMail
      }
    }).then(function (res) {
      that.props.handleMailDelete();
      that.props.newMailAddress(res.data.new_mail);
      toastr.success(res.data.message, res.data.details, {'toastClass': 'toastr-success'});
    });
  };

  handleChange = _ => {
    this.props.changeMailAddress(true);
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

  allMessages = _ =>{
    this.props.showAllMessage(true);
  };

  render(){
    const { tempMail } = this.state;
    return(
      <div className='container-fluid email-container text-white'>
        <div className='row justify-content-center pb-5'>
          <div className='col-12 mt-5 text-center text-light'>
            <h1>
              Temporary Disposable Email Address
            </h1>
          </div>
          <div className='col-12'>
            <div className='row justify-content-center pb-0 pl-3 pr-3 pt-3'>
              <div className='col-md-3 col-sm-12 pr-0 pl-0'>
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
              <div className='col-md-5'>
                <h5>
                  <p className='text-muted mail-desc'>Ready to use email address to send and receive mail from any sites. You don't have to worry about the spam emails in your personal mailbox, your
                    online privacy, giving away your personal email address to other company. Generated fake random email address will be deleted after you leave the page.</p>
                </h5>
              </div>
            </div>
          </div>
          <div className='col-md-8 col-sm-12 pt-2'>
            <div className='row justify-content-around action-pills'>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.handleChange} data-toggle="tooltip" data-placement="bottom" title="Change mail address">
                   <span className='float-left ml-1'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dae1e7" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                   </span>
                  <span className=''>Change</span>
                </div>
              </div>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.handleDelete} data-toggle="tooltip" data-placement="bottom" title="Delete and create new mail address">
                  <span className='float-left ml-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dae1e7" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </span>
                  <span className=''>Delete</span>
                </div>
              </div>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.createMessage} data-toggle="tooltip" data-placement="bottom" title="Send email using current mail address">
                  <span className='float-left ml-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dae1e7" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"/></svg>
                  </span>
                  <span className=''>Write Email</span>
                </div>
              </div>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.allMessages} data-toggle="tooltip" data-placement="bottom" title="List all received mails">
                  <span className='float-left ml-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dae1e7" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 6h-4c0 1.62-1.38 3-3 3s-3-1.38-3-3H5V5h14v4zm-4 7h6v3c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3z"/></svg>
                  </span>
                  <span className=''>All Mails</span>
                </div>
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
    createNewMessage: (value) => dispatch({type: 'CREATE_NEW_MESSAGE', value: value }),
    handleMailDelete: (_) => dispatch({ type: 'TEMP_MAIL_ADDRESS_DELETE' }),
    newMailAddress: (address) => dispatch({type: 'TEMP_MAIL_ADDRESS_CREATE', value: address}),
    changeMailAddress: (value) => dispatch({type: 'TEMP_MAIL_ADDRESS_CHANGE', value: value}),
    showAllMessage: (value) => dispatch({type: 'SHOW_ALL_MESSAGE', value: value})
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tempMail: state.tempMail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer)