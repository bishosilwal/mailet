import { createStore, combineReducers } from 'redux';

const initialState = {
  emails: [],
  createNewMessage: false,
  from: null,
  tempMail: null
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
    case 'CREATE_NEW_MESSAGE':
      return {
        ...state,
        createNewMessage: action.value
      }
    case 'EMAIL_SELECTED':
      return {
        ...state,
        from: action.value,
        createNewMessage: false
      }
    case 'TEMP_MAIL_ADDRESS_RECEIVED':
      return {
        ...state,
        tempMail: action.value
      }
    case 'TEMP_MAIL_ADDRESS_DELETE':
      return {
        ...initialState
      }
    case 'TEMP_MAIL_ADDRESS_CREATE':
      return {
        ...initialState,
        tempMail: action.value
      }
    default:
      return state;
  }
};

const reducer = combineReducers({emailReducer});
window.store = createStore(reducer);
export default window.store;