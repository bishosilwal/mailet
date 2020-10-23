import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Sidebar extends Component {

  render() {
    return(
      <div className='row sidebar-sticky-top'>
        <div className="col p-0">
          <div className="row justify-content-center p-3 m-0 bg-light">
            <img height='50'
                 src='https://w0.pngwave.com/png/387/456/conservatorio-santa-cecilia-maulana-malik-ibrahim-state-islamic-university-malang-gold-lorem-ipsum-is-simply-dummy-text-of-the-printing-system-gold-png-clip-art.png'
                 className="rounded-circle d-block"/>
            <h1></h1>
            <p>test@mailet.in</p>
          </div>
          <div className="row">
            <div className="nav flex-column nav-pills w-100 pl-5" id="v-pills-tab" role="tablist"
                 aria-orientation="vertical">
              <h6 className="pt-2 m-0">Email</h6>
              <div className="dropdown-divider"></div>
              <a className="nav-link" href="/">All Emails</a>
              <a className="nav-link" href="/mail/send">Send Email</a>
              <a className="nav-link" href="mail_address">Delete Emails</a>
              <a className="nav-link" href="mail_address">Change Address</a>
              <div className="dropdown-divider"></div>
              <h6 className="pt-2 m-0">Text Chat</h6>
              <div className="dropdown-divider"></div>
              <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="" role="tab" aria-selected="false">Create
                Room</a>
              <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="" role="tab"
                 aria-selected="false">Join Room</a>
              <div className="dropdown-divider"></div>
              <h6 className="pt-2 m-0">Video Chat</h6>
              <div className="dropdown-divider"></div>
              <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="" role="tab" aria-selected="false">Create
                Room</a>
              <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="" role="tab"
                 aria-selected="false">Join Room</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Sidebar />,
  document.getElementById('sidebar')
)