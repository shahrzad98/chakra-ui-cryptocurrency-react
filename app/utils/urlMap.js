import * as constants from './constants';

export const GetURL = function (id) {
  switch (id) {
    case 'login':
      return constants.API_SERVER + constants.LOGIN_URL;
    case 'login-two-factor':
      return constants.API_SERVER + constants.LOGIN_TWO_FACTOR_URL;

    case 'users-mfa-email':
      return constants.API_SERVER + constants.USERS_MFA_EMAIL;

    case 'users-mfa-google':
      return constants.API_SERVER + constants.USERS_MFA_GOOGLE;

    case 'product-upload':
      return constants.API_SERVER + constants.PRODUCT_UPLOAD;

    case 'captcha':
      return constants.API_SERVER + constants.SERVER_CAPTCHA;

    case 'solve-captcha':
      return constants.API_SERVER + constants.SERVER_CAPTCHA;

    case 'register':
      return constants.API_SERVER + constants.SERVER_REGISTER_USER;

    case 'verify':
      return constants.API_SERVER + constants.SERVER_VERIFY_USER;

    case 'resend-verification':
      return constants.API_SERVER + constants.SERVER_RESEND_VERIFICATION;
    case 'refresh-token':
      return constants.API_SERVER + constants.SERVER_REFRESH_TOKEN;
    case 'request-totp':
      return constants.API_SERVER + constants.SERVER_SEND_TOTP;

    case 'verify-code':
      return constants.API_SERVER + constants.SERVER_VERIFY_TOTP_CODE;

    case 'request-change-password':
      return constants.API_SERVER + constants.SERVER_REQUEST_CHANGE_PASSWORD;

    case 'change-password':
      return constants.API_SERVER + constants.SERVER_CHANGE_PASSWORD;

    case 'reset-password':
      return constants.API_SERVER + constants.SERVER_RESET_PASSWORD;

    case 'get-secret-list':
      return constants.API_SERVER + constants.SERVER_SECRET_LIST;

    case 'security-image':
      return constants.API_SERVER + constants.SERVER_SECURITY_IMAGE;

    case 'update-personal-info':
      return constants.API_SERVER + constants.SERVER_PUT_PERSONAL_INFO;

    case 'user-address':
      return constants.API_SERVER + constants.SERVER_PUT_USER_ADDRESS;

    case 'get-cities':
      return constants.API_SERVER + constants.SERVER_GET_CITIES;

    case 'update-pine':
      return constants.API_SERVER + constants.SERVER_UPDATE_PINE_CODE;

    // update order address
    case 'update-order-address':
      return constants.API_SERVER + constants.SERVER_PATCH_USER_ADDRESS;

    case 'get-couriers':
      return constants.API_SERVER + constants.SERVER_POST_COURIERS;

    case 'delivery-calendar':
      return constants.API_SERVER + constants.SERVER_POST_DELIVERY_CALENDAR;

    case 'update-delivery-slot':
      return constants.API_SERVER + constants.SERVER_POST_UPDATE_DELIVERY_SLOT;

    case 'ws-ticket':
      return constants.API_SERVER + constants.SERVER_GET_WS_TICKET;

    case 'advertisement-channels':
      return constants.API_SERVER + constants.SERVER_ADVERTISMENT_CHANNELS;
    case 'auth-step-three':
      return constants.API_SERVER + constants.SERVER_AUTH_STEP_THREE;

    case 'kyc-info':
      return constants.API_SERVER + constants.SERVER_AUTH_STEP_THREE;

    case 'kyc-base-info':
      return constants.API_SERVER + constants.SERVER_KYC_BASE_INFO;

    case 'griffin-kyc-submit':
      return constants.API_SERVER + constants.SERVER_KYC_SUBMIT;

    case 'griffin-kyc-state':
      return constants.API_SERVER + constants.SERVER_KYC_STATE;

    case 'griffin-kyc-otp':
      return constants.API_SERVER + constants.SERVER_KYC_OTP;

    case 'griffin-kyc-otp-resend':
      return constants.API_SERVER + constants.SERVER_KYC_OTP_RESET;

    case 'selfie-upload':
      return constants.API_SERVER + constants.SERVER_UPLOAD_SELPHI;
    case 'get-documents-batch':
      return constants.API_SERVER + constants.SERVER_GET_DOCUMENTS_BATCH;
    case 'document-name-upload':
      return constants.API_SERVER + constants.SERVER_UPLOAD_NAME_DOCUMENT;

    case 'user-bank-card':
      return constants.API_SERVER + constants.SERVER_USER_BANK_CARD;

    case 'bank-card':
      return constants.API_SERVER + constants.SERVER_USER_BANK_CARD;

    case 'bank-card-template':
      return constants.API_SERVER + constants.BANK_CARD_TEMPLATE;

    case 'ticket-history':
      return constants.API_SERVER + constants.TICKET_HISTORY;

    case 'ticket-upload':
      return constants.API_SERVER + constants.TICKET_UPLOAD;
    case 'ticket-details':
      return constants.API_SERVER + constants.TICKET_DETAILS;
    case 'get-category-ticket':
      return constants.API_SERVER + constants.GET_CATEGORY_HISTORY;
    case 'send-ticket':
      return constants.API_SERVER + constants.SEND_TICKET;

    case 'warehouse-balance':
      return constants.API_SERVER + constants.WAREHOUSE_BALANCE;
    case 'warehouse-deposit-request':
      return constants.API_SERVER + constants.WAREHOUSE_DEPOSIT_REQUEST;
    case 'warehouse-withdraw-request':
      return constants.API_SERVER + constants.WAREHOUSE_WITHDRAW_REQUEST;
    case 'warehouse-create-account':
      return constants.API_SERVER + constants.WAREHOUSE_CREATE_ACCOUNT;
    case 'fiat-deposit-callback':
      return constants.API_SERVER + constants.FIAT_DEPOSIT_CALLBACK;
    case 'warehouse-deposit-list':
      return constants.API_SERVER + constants.WAREHOUSE_DEPOSIT_LIST;
    case 'warehouse-deposit-search':
      return constants.API_SERVER + constants.WAREHOUSE_DEPOSIT_SEARCH;
    case 'warehouse-limit':
      return constants.API_SERVER + constants.WAREHOUSE_LIMIT;

    case 'user-sheba-number':
      return constants.API_SERVER + constants.SERVER_USER_SHEBA_NUMBER;

    case 'exchange-asset':
      return constants.API_SERVER + constants.SERVER_EXCHANGE_ASSET;

    case 'calender-reserve-time':
      return constants.API_SERVER + constants.SERVER_CALENDER_RESERVE_TIME;

    case 'auth-landing-line':
      return constants.API_SERVER + constants.SERVER_AUTH_LANDING_LINE;

    case 'submit-landline':
      return constants.API_SERVER + constants.SUBMIT_LANLINE;

    case 'verify-landline':
      return constants.API_SERVER + constants.VERIFY_LANLINE;

    case 'users-profile-info':
      return constants.API_SERVER + constants.SERVER_PROFILE_INFO;

    case 'asset-names':
      return constants.API_SERVER + constants.SERVER_ASSET_NAMES;

    case 'exchange-market':
      return constants.API_SERVER + constants.SERVER_EXCHANGE_MARKET;

    case 'price-ticker':
      return constants.API_SERVER + constants.SERVER_PRICE_TICKER;

    case 'submit-order':
      return constants.API_SERVER + constants.SERVER_SUBMIT_ORDER;

    case 'new-subscription':
      return constants.API_SERVER + constants.SERVER_NEW_SUBSCRIPTION;

    case 'market-watch':
      return constants.API_SERVER + constants.SERVER_MARKET_WATCH;

    case 'user-orders':
      return constants.API_SERVER + constants.SERVER_USER_ORDERS;
    default:
      return 'ok';
  }
};

export const GetStatic = function (id) {
  return constants.API_SERVER + constants.STATICS + id;
};

export const GetWebsocket = function () {
  return constants.SOCKET_SERVER;
};
