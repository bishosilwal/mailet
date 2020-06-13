import React,{ Component } from 'react';
import { connect } from 'react-redux';
import PulseLoader from "react-spinners/PulseLoader";

import Message from './message';

class MessageContainer extends Component{
  state = {
    from: this.props.from,
    emails: this.props.emails || [],
    createNewMessage: this.props.createNewMessage,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.emails != this.state.emails) {
      this.setState({emails: nextProps.emails});
    }

    if(nextProps.createNewMessage != this.props.createNewMessage) {
      this.setState({createNewMessage: nextProps.createNewMessage});
    }
  };

  messageClicked = e => {
    this.props.fromChanged(e.target.dataset.from);
  };

  render(){
    var { emails, from, createNewMessage } = this.state;
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
                    { emails.length === 0 && createNewMessage === false ?
                      <div className='col-12'>
                        <div className='row justify-content-center p-5'>
                          <div className='col-12 text-center'>
                            <PulseLoader
                              size={15}
                              color={"#142850"}
                              loading={true}
                              margin={2}
                            />
                            <h6 className='text-secondary mt-2'>
                              You have 0 received emails.<br/>
                              <span className='text-light'>Waiting for incoming emails.</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                      :
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
                    }
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
    createNewMessage: state.emailReducer.createNewMessage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fromChanged: email => dispatch({type: 'EMAIL_SELECTED', value: email})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);