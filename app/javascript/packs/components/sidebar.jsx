import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import $ from "jquery";
import { PersistGate } from 'redux-persist/integration/react';
import {connect, Provider} from 'react-redux';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText, ClickOutside } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import axios from 'axios';
import '../store/configureStore'

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
      <ClickOutside
        onClickOutside={() => {
          this.setState({ expanded: false });
        }}
        className={'sidebar'}
      >
        <SideNav
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                <p>{tempMail.mail}</p>
              </NavText>
            </NavItem>
            <NavItem eventKey="emails">
              <NavIcon>
                <a className={this.activeLink('/')} href="/">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mail-bulk"
                       className="svg-inline--fa fa-mail-bulk fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512" width={'25px'}>
                    <path fill="white"
                          d="M160 448c-25.6 0-51.2-22.4-64-32-64-44.8-83.2-60.8-96-70.4V480c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32V345.6c-12.8 9.6-32 25.6-96 70.4-12.8 9.6-38.4 32-64 32zm128-192H32c-17.67 0-32 14.33-32 32v16c25.6 19.2 22.4 19.2 115.2 86.4 9.6 6.4 28.8 25.6 44.8 25.6s35.2-19.2 44.8-22.4c92.8-67.2 89.6-67.2 115.2-86.4V288c0-17.67-14.33-32-32-32zm256-96H224c-17.67 0-32 14.33-32 32v32h96c33.21 0 60.59 25.42 63.71 57.82l.29-.22V416h192c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32zm-32 128h-64v-64h64v64zm-352-96c0-35.29 28.71-64 64-64h224V32c0-17.67-14.33-32-32-32H96C78.33 0 64 14.33 64 32v192h96v-32z"></path>
                  </svg>
                </a>
              </NavIcon>
              <NavText>
                <a className={this.activeLink('/')} href="/">All Emails</a>
              </NavText>
            </NavItem>
            <NavItem eventKey="sendEmail">
              <NavIcon>
                <a className={this.activeLink('/mail/send')} href="/mail/send">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane"
                       className="svg-inline--fa fa-paper-plane fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 512 512" width={'25px'}>
                    <path fill="white"
                          d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
                  </svg>
                </a>
              </NavIcon>
              <NavText>
                <a className={this.activeLink('/mail/send')} href="/mail/send">Send Email</a>
              </NavText>
            </NavItem>
            <NavItem eventKey="deleteEmail">
              <NavIcon>
                <a className={this.activeLink('/mail_address')} href="/mail_address" onClick={e => this.handleDelete(e)} >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                       className="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 448 512" width={'25px'}>
                    <path fill="white"
                          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                  </svg>
                </a>
              </NavIcon>
              <NavText>
                <a className={this.activeLink('/mail_address')} href="/mail_address" onClick={e => this.handleDelete(e)} >Delete Emails</a>
              </NavText>
            </NavItem>
            <NavItem eventKey="changeEmail">
              <NavIcon>
                <a className={this.activeLink('/mail_address/change')} href="/mail_address/change">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit"
                       className="svg-inline--fa fa-edit fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512" width={'25px'}>
                    <path fill="white"
                          d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                  </svg>
                </a>
              </NavIcon>
              <NavText>
                <a className={this.activeLink('/mail_address/change')} href="/mail_address/change">Change Address</a>
              </NavText>
            </NavItem>
            <NavItem eventKey="createRoom">
              <NavIcon>
                <a className={this.activeLink('/video_chat/new')} href="/video_chat/new">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video"
                       className="svg-inline--fa fa-video fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 576 512" width={'25px'}>
                    <path fill="white"
                          d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path>
                  </svg>
                </a>
              </NavIcon>
              <NavText>
                <a className={this.activeLink('/video_chat/new')} href="/video_chat/new">Create Video Room</a>
              </NavText>
            </NavItem>
            <NavItem eventKey="createRoom">
              <NavIcon>
                <a className={this.activeLink('/video_chat/join')} href="/video_chat/join" >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="podcast"
                       className="svg-inline--fa fa-podcast fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 448 512" width={'25px'}>
                    <path fill="white"
                          d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"></path>
                  </svg>
                </a>
              </NavIcon>
              <NavText>
                <a className={this.activeLink('/video_chat/join')} href="/video_chat/join" >Join Video Room</a>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
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
ReactDOM.render(
  <Provider store={window.store}>
    <PersistGate persistor={window.persistor}>
      <Container />
    </PersistGate>
  </Provider>,
  document.getElementById('sidebar')
)
