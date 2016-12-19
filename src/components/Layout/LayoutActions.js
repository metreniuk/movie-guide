import  { CHANGE_LANGUAGE, EN } from '../../constants';

export const changeLanguage = (lang = EN) => {
  return {
    type: CHANGE_LANGUAGE,
    lang
  }
};