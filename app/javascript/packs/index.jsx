// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import EmailContainer from './components/emailContainer'
import MessageContainer from "./components/messageContainer";

export default class Index extends Component {

  render(){
    return(
      <React.Fragment>
        <Header/>
        <EmailContainer />
        <MessageContainer />
      </React.Fragment>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement('div')),
  )
})
