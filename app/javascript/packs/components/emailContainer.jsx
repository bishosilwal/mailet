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
              <span className="typewrite" data-period="5000" data-type='[ "Temporary Disposable Email Address","Mailet"]'>
                <span className="wrap"></span>
              </span>
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
                    <div className='btn btn-primary rounded-circle copy-clipboard' onClick={ e => this.copyToClipboard(tempMail.mail, e) } data-toggle="tooltip" data-placement="right" title="Copy to clipboard"><i className="fas fa-clone"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row justify-content-center p-2'>
              <div className='col-md-5'>
                <p className='text-muted mail-desc'>Use this mail address to send and receive mail from any sites. You don't have to worry about the spam emails in your personal mailbox, your
                  online privacy, giving away your personal email address to other company.</p>
              </div>
            </div>
          </div>
          <div className='col-md-8 col-sm-12 pt-2'>
            <div className='row justify-content-around action-pills'>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.handleChange} data-toggle="tooltip" data-placement="bottom" title="Change mail address">
                   <span className='float-left ml-1'>
                     <i className="fas fa-edit"></i>
                   </span>
                  <span className=''>Change</span>
                </div>
              </div>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.handleDelete} data-toggle="tooltip" data-placement="bottom" title="Delete and create new mail address">
                  <span className='float-left ml-1'>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <span className=''>Delete</span>
                </div>
              </div>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.createMessage} data-toggle="tooltip" data-placement="bottom" title="Send email using current mail address">
                  <span className='float-left ml-1'>
                    <i className="fas fa-envelope-open-text"></i>
                  </span>
                  <span className=''>Send Email</span>
                </div>
              </div>
              <div className='col-md-3 col-sm-12'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.allMessages} data-toggle="tooltip" data-placement="bottom" title="List all received mails">
                  <span className='float-left ml-1'>
                    <i className="fas fa-mail-bulk"></i>
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
    tempMail: state.emailReducer.tempMail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer)