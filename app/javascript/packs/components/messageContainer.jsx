import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PulseLoader from "react-spinners/PulseLoader";

import Message from './message';
import EmailMessageCreator from "./emailMessageCreator";
import CustomMailAddress from "./customMailAddress";

class MessageContainer extends Component{
  state = {
    from: this.props.from,
    emails: this.props.emails || [],
    tempMail: this.props.tempMail,
    createNewMessage: this.props.createNewMessage,
    changeMailAddress: this.props.changeMailAddress,
    showAllMessage: this.props.showAllMessage,
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  };

  messageClicked = e => {
    this.props.fromChanged(e.target.dataset.from);
  };

  renderContent() {
    var { emails, from, createNewMessage, changeMailAddress, showAllMessage } = this.state;
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
        <CustomMailAddress />
      )
    } else if(showAllMessage) {
      if(emails.length === 0 && !createNewMessage) {
        return(
          <div className='col-12'>
            <div className='row justify-content-center p-5 m-5 loading-row'>
              <div className='col-12 text-center'>
                <PulseLoader
                  size={15}
                  color={"#142850"}
                  loading={true}
                  margin={2}
                />
                <h2 className='text-secondary mt-2'>
                  You have received 0 emails.<br/>
                  <span className='text-light'>Waiting for incoming emails.</span>
                </h2>
              </div>
            </div>
          </div>
        )
      } else {
        return(
          <div className='col-12'>
            <div className='row'>
              <div className='col-md-4 p-2 address-list'>
                {emailAddressList}
              </div>
              <div className='col-md-8 col-sm-12 p-1 mt-2'>
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-message" role="tabpanel"
                       aria-labelledby="v-pills-message-tab">
                    <Message />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    } else {
        return(
          <div className='col-12'>
            <div className='row justify-content-center'>
              <div className='col-md-10 col-sm-12 p-1 mt-2'>
                <EmailMessageCreator />
              </div>
            </div>
          </div>
        )

    }
  }
  render(){
    return(
      <div className='container-fluid'>
        <div className='row justify-content-center p-3 pb-4'>
          <div className='col-md-10 col-sm-12'>
            <h5>
              <span className='text-primary font-italic font-weight-light note'>*Note: Incoming mail is updated automatically</span>
            </h5>
          </div>
          <div className='col-md-10 col-sm-12 message-container'>
            <div className="card message-container-card" >
              <div className="card-header">
                <div className='row justify-content-around text-light'>
                  <div className='col'>Sender</div>
                  <div className='col'>Message</div>
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
    showAllMessage: state.emailReducer.showAllMessage,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fromChanged: email => dispatch({type: 'EMAIL_SELECTED', value: email}),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
