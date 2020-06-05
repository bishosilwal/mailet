import { createStore } from 'redux';

const initialState = {
  emails: [{
    id: 1,
    to: 'receiver@gmail.com',
    from: 'sender@gmail.com',
    subject: 'test message',
    body: 'This is the body of message'
  },
    {
      id: 2,
      to: 'receiver1@gmail.com',
      from: 'sender1@gmail.com',
      subject: 'test1 message',
      body: 'This is the body of message'
    },
    {
      id: 3,
      to: 'receiver3@gmail.com',
      from: 'sender3@gmail.com',
      subject: 'test3 message',
      body: 'This is the body of message'
    }
  ]
};

function rootReducer(state, action) {
  console.log(action.type);
  switch(action.type) {
    default:
      return state
  }
};

export default function configureStore() {
  const store = createStore(rootReducer, initialState);
  return store;
};