import consumer from "./consumer"

consumer.subscriptions.create("EmailChannel", {
  initialized() {
    this.initEmail = this.initEmail.bind(this);
  },
  connected() {
    console.log('subscription is ready')
    // Called when the subscription is ready for use on the server
    this.initEmail();
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
  },

  initEmail() {
    this.perform('get_email')
  },

});
