import React,{ Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';

class MessageContainer extends Component{
  state = {
    selectedMessages: [],
    from: null,
    emails: this.props.emails || [],
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.emails != this.state.emails) {
      this.setState({emails: nextProps.emails})
    }
  };

  messageClicked = e => {
    var emails = this.state.emails;
    var selectedMessages = emails.find(m => m.from == e.target.dataset.from).messages;
    this.setState({...this.state, selectedMessages: selectedMessages, from: e.target.dataset.from});
  };

  render(){
    var {selectedMessages, emails, from} = this.state;
    const messageList = (
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
                    <div className='col-4 p-2 address-list'>
                      {messageList}
                    </div>
                    <div className='col-8 p-1'>
                      <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-message" role="tabpanel"
                             aria-labelledby="v-pills-message-tab">
                          <Message selectedMessages={selectedMessages} from={from}/>
                        </div>
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
    emails: state.emailReducer.emails,
  }
};
export default connect(mapStateToProps, null)(MessageContainer);