export const arabicSupported = (code) => code.replace(
  /[\u0660-\u0669\u06F0-\u06F9]/g,
  function (a) {
    return String.fromCharCode((a.charCodeAt(0) & 15) + 48);
  }
);

export const isValidNationalCode = code => {

  if (arabicSupported(code).length !== 10 || /(\d)(\1){9}/.test(arabicSupported(code))) return false;

  let sum = 0,
    chars = arabicSupported(code).split(''),
    lastDigit,
    remainder;

  for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

  remainder = sum % 11;
  lastDigit = remainder < 2 ? remainder : 11 - remainder;

  return +chars[9] === lastDigit;
};

export const isValidEmail = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const isValidPostalCode = postalCode => /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/.test(arabicSupported(postalCode))

export const isValidNumber = number => /^\d+$/.test(arabicSupported(number))

export const isEnglish = nationalId => !/[^a-zA-Z]/.test(nationalId)

export const isValidLandline = phone => /^(\+98|0)?\d{10}$/.test(phone) && !['3', '9'].includes(phone.toString()[3])

export const isCardValid = card => !/[^a-zA-Z]/.test(card)

export function isPersian(str) {
  var p = /^[\u0600-\u06FF\s]+$/;
  return p.test(str)
}
