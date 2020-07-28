import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import 'react-summernote/dist/react-summernote.css'; // import styles
import ReactSummernote from 'react-summernote';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';

class EmailMessageCreator extends Component {
  state = {
    from: this.props.from || '',
    newMessage: {
      subject: '',
      body: '',
      to: this.props.from || '',
    },
    subjectInvalid: false,
    toInvalid: false,
    createNewMessage: this.props.createNewMessage,
    tempMail: this.props.tempMail
  }

  sendMessage = (e) => {
    var that = this;
    var { newMessage, createNewMessage, from, tempMail } = this.state;
    newMessage['from'] = tempMail.mail; // make sure to change when system generate the mail
    if(from.length != 0 && !createNewMessage) {
      newMessage['to'] = from;
    }
    if(createNewMessage && newMessage['to'].trim().length == 0) {
      this.setState({toInvalid: true})
      e.preventDefault();
      return
    }

    if(newMessage['subject'].trim().length == 0) {
      this.setState({ subjectInvalid: true });
      e.preventDefault();
      return;
    }
    this.setState({subjectInvalid: false})

    var token = window.$("meta[name='csrf-token']").attr('content');
    axios.post('/send_email', {
      new_message: newMessage
    },{
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      }
    })
      .then(function (res) {
        toastr.success(res.data.message, res.data.details, {'toastClass': 'toastr-success'});
        that.setState({newMessage: {subject: '', body: '', to: ''}});
        that.summernote.reset();
        that.props.messageSent(res.data.sent_message);
      })
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  }

  handleChange = (e) => {
    var newMessage = this.state.newMessage;
    newMessage[e.target.name] = e.target.value;
    this.setState({newMessage: newMessage})
  }

  summerNoteChange = value => {
    var newMessage = this.state.newMessage;
    newMessage['body'] = value;
    this.setState({newMessage: newMessage});
  }

  render() {
    var { newMessage, subjectInvalid, createNewMessage, toInvalid } = this.state;
    return(
      <div className='col-12 shadow-lg p-3 pt-0 mb-2 bg-white rounded'>
        <div className='row'>
          { createNewMessage ?
            <div className='col-12 p-3'>
              <div className="form-group row">
                <label htmlFor="to" className="col-sm-2 col-form-label">
                  <span className='font-weight-bolder'>To:</span>
                </label>
                <div className="col-sm-10">
                  <input type="text" name='to' value={newMessage.to} className={"form-control " + `${toInvalid ? 'is-invalid' : ''}` } id="to" placeholder='Enter mail subject' onChange={this.handleChange} required={true}/>
                  <div className="invalid-feedback">
                    Please enter email address
                  </div>
                </div>
              </div>
            </div> :
            ''
          }
          <div className='col-12 p-3'>
            <div className="form-group row">
              <label htmlFor="subject" className="col-sm-2 col-form-label">
                <span className='font-weight-bolder'>Subject:</span>
              </label>
              <div className="col-sm-10">
                <input type="text" name='subject' value={newMessage.subject} className={"form-control " + `${subjectInvalid ? 'is-invalid' : ''}` } id="subject" placeholder='Enter mail subject' onChange={this.handleChange} required={true}/>
                <div className="invalid-feedback">
                  Please enter subject
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 p-3 pt-0'>
            <div className="form-group">
              <ReactSummernote
                value="Hi there"
                options={{
                  height: 250,
                  dialogsInBody: true,
                  toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['fontname', ['fontname']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture']],
                    ['view', ['fullscreen']]
                  ]
                }}
                ref={(summernote) => {this.summernote = summernote}}
                onChange={this.summerNoteChange}
              />
            </div>
          </div>
          <div className='col-12 '>
            <button className='btn btn-outline-primary float-right' onClick={this.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  var from = state.emailReducer.createNewMessage ? '' : state.emailReducer.from;
  return {
    createNewMessage: state.emailReducer.createNewMessage,
    from: from,
    tempMail: state.emailReducer.tempMail
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    messageSent: message => dispatch({ type: 'EMAIL_SENT', value: message })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailMessageCreator);