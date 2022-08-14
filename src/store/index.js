import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from 'store/reducers';
import initialState from 'store/initialState';

const composeWithDevTools = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = applyMiddleware(reduxThunk);
const store = createStore(reducers, initialState, composeWithDevTools(middleware));

export default store;
