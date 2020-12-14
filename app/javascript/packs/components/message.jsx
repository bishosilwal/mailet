import React,{ Component } from 'react';
import { connect } from 'react-redux';
import CustomIframe from './customIframe';
import EmailMessageCreator from "./emailMessageCreator";
import axios from 'axios';
import $ from 'jquery';
import toastr from 'toastr';
window.toastr = toastr;

const token = $("meta[name='csrf-token']").attr('content');

class Message extends Component{
  state = {
    selectedMessages: this.props.selectedMessages || [],
    createNewMessage: this.props.createNewMessage,
    disableDownload: false,
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.email-pdf-download span').hover(function(e){
      e.target.style.cursor = 'pointer';
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    $('[data-toggle="tooltip"]').tooltip();
    $('.email-pdf-download span').hover(function(e){
      e.target.style.cursor = 'pointer';
    })
  }

  formatDateTime(date) {
    date = new Date(date);
    date = date.toDateString() + ' ' + date.toLocaleTimeString();
    return date;
  }

  downloadPdf(id) {
    var that = this;
    var {disableDownload} = this.state;
    if(disableDownload) {
      return;
    }
    this.setState({disableDownload: true});
    axios({
      method: 'get',
      url: '/mail/download?id='+id,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token
      }
    }).then(function(res) {
      window.open("/pdfs/" + res.data.file, '_blank');
      that.setState({disableDownload: false});
    }).catch(error => {
      that.setState({disableDownload: false});
      console.log(error);
    });
    toastr.info('Please wait!', 'Downloading email...');
  }

  downloadRawPdf(raw) {
    var rawWindow = window.open("", "_blank");
    rawWindow.document.write(raw);
  }

  render() {
    var {selectedMessages, createNewMessage} = this.state;
    var scrollable = selectedMessages.length >= 4 ? true : false;

    const scrollableMessageStyles = scrollable ? {
      height: '1000px',
      overflowY: 'scroll',
    } : {}

    const messagesList =
      <div className={'row p-1 ' + scrollable ? 'row p-1' : ''} style={scrollableMessageStyles} ref={(el) =>{ this.messagesList = el }}>
        {selectedMessages.map(message =>
          <div className='col-12 shadow-lg p-3 mb-3 bg-white rounded' key={message.id}>
            <div className='row'>
              <div className='col-6'>
                <span className='font-weight-bolder'>From:</span> <span>{message.from} </span> <br />
                <span className='font-weight-bolder'>To: </span><span>{message.to}</span>
              </div>
              <div className='col-6'>
                <div className='email-pdf-download'>
                  <span onClick={e =>this.downloadPdf(message.id)} data-toggle="tooltip" data-placement="bottom" title="Download as pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    <sup>Pdf</sup>
                  </span>
                  <span onClick={e =>this.downloadRawPdf(message.raw)} data-toggle="tooltip" data-placement="bottom" title="Download as raw pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                    <sup>Raw</sup>
                  </span>
                </div>
                <p className='float-right'>
                  <span className='font-weight-bolder'>Date: </span>
                  <span>{this.formatDateTime(message.created_at)}</span>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 p-3 border-top border-bottom border-light'>
                <span className='font-weight-bolder'>Subject: </span>
                {message.subject}
              </div>
              <div className='col-12 p-3'>
                <CustomIframe content={message.body} />
              </div>
            </div>
          </div>
        ) }
      </div>

    if(selectedMessages.length != 0 || createNewMessage) {
      return(
        <div className='container'>
          {(createNewMessage) ? '' : messagesList}
          <div className='row p-1'>
            <EmailMessageCreator />
          </div>
        </div>
      )
    } else {
      return(
        <div className='container'>
          <div className='row p-5 text-center'>
            No messages
          </div>
        </div>
      )
    }
  }
}

const mapsStateToProps = (state) => {
  const from = state.emailReducer.from;
  var messages = state.emailReducer.emails.filter(m => m.from === from)[0];
  if(typeof(messages) == 'undefined') {
    messages = [];
  } else {
    messages = messages.messages
  }
  return {
    selectedMessages: messages,
    createNewMessage: state.createNewMessage
  }
};
export default connect(mapsStateToProps, null)(Message);