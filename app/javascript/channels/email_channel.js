import consumer from "./consumer"

consumer.subscriptions.create("EmailChannel", {
  connected() {
    console.log('subscription is ready')
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log('receive data')
    window.store.dispatch({
      type: 'EMAIL_RECEIVED',
      email: data.email
    })
    // Called when there's incoming data on the websocket for this channel
  }
});
