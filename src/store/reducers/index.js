import { reduceReducers } from 'store/reduxTools';
import initialState from 'store/initialState';

import lang from './lang';
import user from './user';

const reducers = reduceReducers(initialState, lang, user);

export default reducers;
