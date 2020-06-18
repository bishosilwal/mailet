import consumer from "./consumer"

window.emailChannel = consumer.subscriptions.create("EmailChannel", {
  initialized() {
  },
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if(data.email) {
      window.store.dispatch({
        type: 'EMAIL_RECEIVED',
        email: data.email
      });
    }
    // Called when there's incoming data on the websocket for this channel
  }
});
