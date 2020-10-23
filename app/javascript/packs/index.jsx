// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import MessageContainer from "./components/messageContainer";
import './store/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PulseLoader from "react-spinners/PulseLoader";

class Index extends Component {
  render(){
    return(
      <Provider store={window.store}>
        <PersistGate loading={
          <PulseLoader
            size={15}
            color={"#142850"}
            loading={true}
            margin={2}
          />
        } persistor={window.persistor}>
          <MessageContainer />
        </PersistGate>
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