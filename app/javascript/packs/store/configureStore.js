import { createStore, combineReducers } from 'redux';

const initialState = {
  emails: [
  ]
};

function emailReducer(state = initialState, action) {
  console.log('email reducer called')
  switch (action.type) {
    case 'EMAIL_RECEIVED':
      return {
        ...state,
        emails: [
          ...state.emails,
          action.email
        ],
      }
    default:
      return state;
  }
};

const reducer = combineReducers({emailReducer});
window.store = createStore(reducer);
export default window.store;