import { SET_LANG } from 'store/types';

export const storeLang = (data) => {
  return {
    type: SET_LANG,
    payload: data,
  };
};
