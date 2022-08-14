const langKey = 'lng';

export const setLang = (lang) => {
  window.localStorage.setItem(langKey, lang);
};

export const getLang = () => {
  const lang = window.localStorage.getItem(langKey);
  return lang;
};
