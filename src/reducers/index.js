import { combineReducers } from 'redux';

import auth from './auth/auth'
import search from './search/search'

export default combineReducers({ auth, search });