import { CHANGE_LANGUAGE } from '../../constants'

export const language = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return Object.assign({}, state, {
        lang: action.lang
      });
    default:
      return state
  }
};