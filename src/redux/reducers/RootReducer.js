import { combineReducers } from 'redux'

import PresalesReducer from './PostReducer'
import loginReducer from './loginSlice'

const RootReducer = combineReducers({
  login: loginReducer,
  preSales: PresalesReducer,
});

export default RootReducer
