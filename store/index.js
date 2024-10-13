import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/rootReducer'; // Import your root reducer

// const store = configureStore({
//   reducer: rootReducer, // Use your root reducer
//   // Redux Toolkit automatically includes thunk and other middleware
// });

// export default store;
