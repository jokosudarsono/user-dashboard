import update from 'immutability-helper';

import initialState from 'store/initialState';
import { createReducer } from 'store/reduxTools';
import { SET_LANG } from 'store/types';

export default createReducer(initialState, {
  [SET_LANG]: (state, action) => setLang(state, action.payload),
});

const setLang = (state, payload) => {
  return update(state, {
    lang: { $set: payload },
  });
};
