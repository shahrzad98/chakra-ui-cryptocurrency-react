/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './constants';

export function changeLocale(languageLocale) {
  localStorage.setItem('lang', languageLocale);
  // window.location.reload();

  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
