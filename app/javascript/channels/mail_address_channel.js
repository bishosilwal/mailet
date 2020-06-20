import consumer from "./consumer"

window.mailAddressChannel = consumer.subscriptions.create("EmailChannel",{
  initialized() {
    this.getTempMailAddress = this.getTempMailAddress.bind(this);
  },

  connected() {
    this.getTempMailAddress();
  },

  disconnected() {

  },

  received(data) {
    if(data.mail_address) {
      window.store.dispatch({
        type: 'TEMP_MAIL_ADDRESS_RECEIVED',
        value: data.mail_address
      });
    }
  },

  getTempMailAddress() {
    this.perform('get_temp_mail_address')
  }
});