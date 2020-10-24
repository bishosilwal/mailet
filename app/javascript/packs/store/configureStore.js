import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import consumer from "../../channels/consumer";

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  emails: [],
  from: null,
  tempMail: {},
  createNewMessage: false,
  changeMailAddress: false,
  showAllMessage: true,
};

function subscribeChannel(mailAddress){
  if(window.emailChannel) {
    window.emailChannel.unsubscribe();
  }
  window.emailChannel = consumer.subscriptions.create({
    channel: "EmailChannel",
    mail_address: mailAddress
  }, {
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
        toastr.info("Please open mails.", 'Mail received');
      }
      // Called when there's incoming data on the websocket for this channel
    }
  });
}

function emailReducer(state = initialState, action) {
  switch (action.type) {
    case 'EMAIL_RECEIVED':
      var mail = state.emails.find(m => m.from == action.email.from);
      if(typeof(mail) == 'undefined') {
        return {
          ...state,
          emails: [
            ...state.emails,
            {
              from: action.email.from,
              messages: [action.email]
            }
          ],
        }
      } else {
        return {
          ...state,
          emails: [
            ...state.emails.filter(m => m.from != action.email.from),
            {
              from: action.email.from,
              messages: [
                ...mail.messages,
                action.email
              ]
            }
          ],
        }
      }

    case 'CREATE_NEW_MESSAGE':
      return {
        ...state,
        createNewMessage: action.value,
        changeMailAddress: false,
        showAllMessage: false,
      }

    case 'EMAIL_SELECTED':
      return {
        ...state,
        from: action.value,
        createNewMessage: false,
        changeMailAddress: false,
      }

    case 'TEMP_MAIL_ADDRESS_DELETE':
      return {
        ...initialState
      }

    case 'TEMP_MAIL_ADDRESS_CREATE':
      subscribeChannel(action.value.mail);
      return {
        ...state,
        tempMail: action.value
      }

    case 'EMAIL_SENT':
      var mail = state.emails.find(m => m.from == action.value.to);
      if(mail){
        mail.messages = [
          ...mail.messages,
          action.value
        ];
        return {
          ...state,
          emails: [
            ...state.emails.filter(m=> m.from != action.value.to),
            mail
          ]
        }
      }else{
        return {
          ...state
        }
      }
    case 'TEMP_MAIL_ADDRESS_CHANGE':
      return {
        ...state,
        changeMailAddress: action.value,
        showAllMessage: false,
        createNewMessage: false,
      }
    case 'SHOW_ALL_MESSAGE':
      return {
        ...state,
        showAllMessage: action.value,
        createNewMessage: false,
        changeMailAddress: false,
      }

    default:
      return state;
  }
};

const persistedStore = persistReducer(persistConfig, emailReducer);
const store = createStore(persistedStore);
const persistor = persistStore(store);
window.store = window.store ? window.store : store;
window.persistor = window.persistor ? window.persistor : persistor;