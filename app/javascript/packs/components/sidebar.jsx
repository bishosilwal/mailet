import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import $ from "jquery";
import { PersistGate } from 'redux-persist/integration/react';
import {connect, Provider} from 'react-redux';
import axios from 'axios';

const token = $("meta[name='csrf-token']").attr('content');

class Sidebar extends Component {
  state = {
    tempMail: this.props.tempMail || '',
  }
  handleDelete = e => {
    e.stopPropagation();
    e.preventDefault();
    var that = this;
    var tempMail = this.props.tempMail;
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

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps != this.props) {
      this.setState({...nextProps})
    }
  };

  activeLink(link) {
    if(window.location.pathname == link) {
      return ' active';
    }
    return '';
  }
  render() {
    const { tempMail } = this.state;
    return(
      <div className='row sidebar-sticky-top'>
        <div className="col p-0">
          <div className="row justify-content-center p-3 m-0 bg-light">
            <img height='50'
                 src='https://w0.pngwave.com/png/387/456/conservatorio-santa-cecilia-maulana-malik-ibrahim-state-islamic-university-malang-gold-lorem-ipsum-is-simply-dummy-text-of-the-printing-system-gold-png-clip-art.png'
                 className="rounded-circle d-block"/>
            <div className='col-12'>
              <p>{tempMail.mail}</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className='col pl-4'>
              <div className="dropdown-divider"></div>
              <h6 className="pt-2 m-0">Email Section</h6>
              <div className="dropdown-divider"></div>
              <a className={"nav-link" + this.activeLink('/')} href="/">All Emails</a>
              <a className={"nav-link" + this.activeLink('/mail/send')} href="/mail/send">Send Email</a>
              <a className={"nav-link" + this.activeLink('/mail_address')} href="/mail_address" onClick={e => this.handleDelete(e)} >Delete Emails</a>
              <a className={"nav-link" + this.activeLink('/mail_address/change')} href="/mail_address/change">Change Address</a>
              <div className="dropdown-divider"></div>
              <h6 className="pt-2 m-0">Video Chat Section</h6>
              <div className="dropdown-divider"></div>
              <a className={"nav-link" + this.activeLink('/video_chat/new')} href="/video_chat/new">Create Room</a>
              <a className={"nav-link" + this.activeLink('/video_chat/join')} href="/video_chat/join" >Join Room</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    tempMail: state.emailReducer.tempMail,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleMailDelete: (_) => dispatch({ type: 'TEMP_MAIL_ADDRESS_DELETE' }),
    newMailAddress: (address) => dispatch({type: 'TEMP_MAIL_ADDRESS_CREATE', value: address}),
  }
}
const Container = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

$(document).ready(function() {
  ReactDOM.render(
    <Provider store={window.store}>
      <PersistGate persistor={window.persistor}>
        <Container />
      </PersistGate>
    </Provider>,
    document.getElementById('sidebar')
  )
})
