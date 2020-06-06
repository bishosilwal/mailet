import { createStore, combineReducers } from 'redux';

const initialState = {
  emails: []
};

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
          ]
        }
      }
    default:
      return state;
  }
};

const reducer = combineReducers({emailReducer});
window.store = createStore(reducer);
export default window.store;