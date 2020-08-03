// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import EmailContainer from './components/emailContainer';
import MessageContainer from "./components/messageContainer";
import './store/configureStore';
import { Provider } from 'react-redux';

class Index extends Component {
  render(){
    return(
      <Provider store={window.store}>
        <EmailContainer />
        <MessageContainer />
      </Provider>
    )
  }
}

$(document).on('ready DOMContentLoaded turbolinks:load', function() {
  if(document.getElementById('main-app-body')) {
    ReactDOM.render(
      <Index />,
      document.getElementById('main-app-body')
    )
  }
});