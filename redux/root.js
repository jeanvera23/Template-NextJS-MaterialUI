import { combineReducers } from 'redux';

import alertReducer from './alert/alert.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  alertReducer,
  userReducer,
});
export default rootReducer;