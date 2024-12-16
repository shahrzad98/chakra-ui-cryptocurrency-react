import * as constants from './constants';

export const LanguageTools = function () {
  switch (localStorage.getItem('lang')) {
    case 'en':
      return {
        Dir: 'ltr',
        Align: 'text-left',
        Lang: constants.LANGUAGE_ENGLISH,
        LangID: 1,
      };
    case 'fa':
      return {
        Dir: 'rtl',
        Align: 'text-right',
        Lang: constants.LANGUAGE_FARSI,
        LangID: 2,
      };
    default:
      localStorage.setItem('lang', 'fa');
      return {
        Dir: 'rtl',
        Align: 'text-right',
        Lang: constants.LANGUAGE_FARSI,
        LangID: 2,
      };
  }
};

const TranslateDataBlock = dataBlock => {
  if (dataBlock) {
    if (LanguageTools().Lang == constants.LANGUAGE_FARSI) {
      return dataBlock.NameLocal;
    }
    return dataBlock.Name;
  }
};

const TranslateErrorBlock = dataBlock => {
  if (dataBlock) {
    if (LanguageTools().Lang == constants.LANGUAGE_FARSI) {
      return dataBlock.MessageFarsi;
    }
    return dataBlock.Message;
  }
};

export { TranslateDataBlock, TranslateErrorBlock };
