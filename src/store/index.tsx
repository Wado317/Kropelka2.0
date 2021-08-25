import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import donationReducer from './reducers/donationReducer';

const rootReducer = combineReducers({
  donation: donationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
