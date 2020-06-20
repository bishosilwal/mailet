import React,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class EmailContainer extends Component{
  state = {
    tempMail: this.props.tempMail,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  };

  createMessage = e => {
    this.props.createNewMessage(true);
  };

  handleDelete = _ => {
    var that = this;
    var token = window.$("meta[name='csrf-token']").attr('content');
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
      toastr.success(res.data.message, res.data.details, {'iconClass': 'toastr-success'});
    });
  };

  render(){
    const { tempMail } = this.state;
    return(
      <div className='container-fluid email-container text-white'>
        <div className='row justify-content-center pb-5'>
          <div className='col-12 mt-5 text-center text-light'>
            <h6>Your Temporary Email Address</h6>
          </div>
          <div className='col-12'>
            <div className='row justify-content-center pb-0 pl-3 pr-3 pt-3'>
              <div className='col-4 pr-0'>
                <div className='temp-email-div rounded-pill m-3 p-3 text-center'>
                  <span className='text-dark'>{tempMail}</span>
                  <span className='float-right'>
                    <i className="far fa-copy fa-2x text-secondary"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-8 mt-5 pt-5'>
            <div className='row justify-content-around'>
              <div className='col-4'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75'>
                   <span className='float-left ml-1'>
                     <i className="fas fa-edit"></i>
                   </span>
                  <span className=''>Change Email</span>
                </div>
              </div>
              <div className='col-4'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.handleDelete}>
                  <span className='float-left ml-1'>
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <span className=''>Delete Email</span>
                </div>
              </div>
              <div className='col-4'>
                <div className='btn btn-primary rounded-pill p-3 text-center w-75' onClick={this.createMessage}>
                  <span className='float-left ml-1'>
                    <i className="fas fa-envelope-square"></i>
                  </span>
                  <span className=''>Send Email</span>
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
    newMailAddress: (address) => dispatch({type: 'TEMP_MAIL_ADDRESS_CREATE', value: address})
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tempMail: state.emailReducer.tempMail
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer)