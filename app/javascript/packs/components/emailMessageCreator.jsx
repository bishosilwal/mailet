import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

class EmailMessageCreator extends Component {
  state = {
    from: this.props.from || '',
    newMessage: {
      subject: '',
      body: '',
      to: this.props.from || '',
    },
    subjectInvalid: false,
    bodyInvalid: false,
    toInvalid: false,
    createNewMessage: this.props.createNewMessage
  }

  sendMessage = (e) => {
    var that = this;
    var { newMessage, createNewMessage, from } = this.state;
    newMessage['from'] = 'test@gmail.com'; // make sure to change when system generate the mail
    if(from.length != 0) {
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
    this.setState({subjectInvalid: false, bodyInvalid: false})
    if(newMessage['body'].trim().length == 0) {
      this.setState({ bodyInvalid: true });
      e.preventDefault();
      return;
    }

    this.setState({ bodyInvalid: false });

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
        that.setState({newMessage: {subject: '', body: '', to: ''}});
        toastr.success(res.data.message, res.data.details, {'iconClass': 'toastr-success'})
      })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.createNewMessage != this.props.createNewMessage) {
      this.setState({createNewMessage: nextProps.createNewMessage});
    }

    if(nextProps.from != this.props.from) {
      this.setState({from: nextProps.from});
    }
  }

  handleChange = (e) => {
    var newMessage = this.state.newMessage;
    newMessage[e.target.name] = e.target.value;
    this.setState({newMessage: newMessage})
  }

  render() {
    var { newMessage, subjectInvalid, bodyInvalid, createNewMessage, toInvalid } = this.state;
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
                  <input type="text" name='to' value={newMessage.to} ref={(el) => this.mailTo = el} className={"form-control " + `${toInvalid ? 'is-invalid' : ''}` } id="to" placeholder='Enter mail subject' onChange={this.handleChange} required={true}/>
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
                <input type="text" name='subject' value={newMessage.subject} ref={(el) => this.mailSubject = el} className={"form-control " + `${subjectInvalid ? 'is-invalid' : ''}` } id="subject" placeholder='Enter mail subject' onChange={this.handleChange} required={true}/>
                <div className="invalid-feedback">
                  Please enter subject
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 p-3 pt-0'>
            <div className="form-group">
              <textarea value={newMessage.body} ref={(el) => this.mailBody = el} onChange={this.handleChange} name='body' rows="3" placeholder='Enter message' required={true} className={"form-control " + `${bodyInvalid ? 'is-invalid' : ''}` }></textarea>
              <div className="invalid-feedback">
                Please enter body
              </div>
            </div>
          </div>
          <div className='col-12 '>
            <button className='btn btn-success float-right' onClick={this.sendMessage}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    createNewMessage: state.emailReducer.createNewMessage,
    from: state.emailReducer.from
  }
}

export default connect(mapStateToProps, null)(EmailMessageCreator)