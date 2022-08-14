import update from 'immutability-helper';

import initialState from 'store/initialState';
import { createReducer } from 'store/reduxTools';
import { USER_SET_DATA } from 'store/types';

export default createReducer(initialState, {
  [USER_SET_DATA]: (state, action) => updateUserData(state, action.payload),
});

const updateUserData = (state, payload) => {
  const { data } = payload

  return update(state, {
    user: {
      data: { $set: data },
    },
  });
};
