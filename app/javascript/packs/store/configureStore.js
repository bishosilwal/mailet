import { createStore, combineReducers } from 'redux';

const initialState = {
  emails: [],
  from: null,
  tempMail: {},
  createNewMessage: false,
  changeMailAddress: false,
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
        createNewMessage: action.value,
        changeMailAddress: false,
      }

    case 'EMAIL_SELECTED':
      return {
        ...state,
        from: action.value,
        createNewMessage: false
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
        ...initialState,
        changeMailAddress: action.value,
        tempMail: action.tempMail
      }

    default:
      return state;
  }
};

const reducer = combineReducers({emailReducer});
window.store = createStore(reducer);
export default window.store;