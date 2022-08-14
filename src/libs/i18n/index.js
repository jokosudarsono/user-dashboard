import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import langEN from 'locales/en';
import langID from 'locales/id';

import { getLang } from 'utils/localStorage';

const currentLang = getLang();

const i18nextInit = () => {
  const options = {
    lng: currentLang ? currentLang : 'id',
    resources: {
      en: {
        translation: langEN,
      },
      id: {
        translation: langID,
      },
    },
    fallbackLng: {
      en: ['en'],
      id: ['id'],
      default: [process.env.LANG],
    },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    nsSeparator: false,
    keySeparator: '.',
  };

  console.log('initialize i18n...');

  return i18next.use(initReactI18next).init(options);
};

export default i18nextInit;
