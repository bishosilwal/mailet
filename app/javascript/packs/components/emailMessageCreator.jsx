import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

class EmailMessageCreator extends Component {
  state = {
    from: this.props.from,
    newMessage: {
      subject: '',
      body: ''
    },
    subjectInvalid: false,
    bodyInvalid: false,
    createNewMessage: this.props.createNewMessage
  }

  sendMessage = (e) => {
    var that = this;
    var newMessage = this.state.newMessage;
    newMessage['to'] = this.state.from;
    newMessage['from'] = 'test@gmail.com';
    if(newMessage['subject'].trim().length == 0) {
      this.setState({subjectInvalid: true})
      e.preventDefault();
      return;
    }
    this.setState({subjectInvalid: false, bodyInvalid: false})
    if(newMessage['body'].trim().length == 0) {
      this.setState({bodyInvalid: true})
      e.preventDefault();
      return;
    }
    this.setState({bodyInvalid: false})
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
        that.setState({newMessage: {subject: '', body: ''}});
        toastr.success(res.data.message, res.data.details, {'iconClass': 'toastr-success'})
      })
  }

  handleChange = (e) => {
    var newMessage = this.state.newMessage;
    newMessage[e.target.name] = e.target.value;
    this.setState({newMessage: newMessage})
  }

  render() {
    var { newMessage, subjectInvalid, bodyInvalid, createNewMessage} = this.state;
    return(
      <div className='col-12 shadow-lg p-3 pt-0 mb-2 bg-white rounded'>
        <div className='row'>
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