const url = new URL(window.location.href);
export const APP_VERSION = 'v1';
export const SERVER_PORT = 80;
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const API_SERVER = `${url.protocol}//192.168.100.6:${SERVER_PORT}`;
export const SOCKET_SERVER = `${window.location.protocol === 'https' ? 'wss' : 'ws'} ://${
  url.hostname
}${SERVER_PORT}/api/${APP_VERSION}/gabriel/subscribe`;

export const STATICS = '/api/v1/static/';

export const LOGIN_URL = `/api/${APP_VERSION}/cerberus/users/login`;
export const LOGIN_TWO_FACTOR_URL = `/api/${APP_VERSION}/cerberus/users/login-two-factor`;
export const SERVER_CAPTCHA = `/api/${APP_VERSION}/auth/captcha`;
// export const SERVER_CAPTCHA_SOLVE = `/api/${APP_VERSION}/cerberus/captcha/solve`;

export const SERVER_REGISTER_USER = `/api/${APP_VERSION}/cerberus/users/register`;
export const SERVER_VERIFY_USER = `/api/${APP_VERSION}/cerberus/users/verify`;
export const SERVER_RESEND_VERIFICATION = `/api/${APP_VERSION}/cerberus/users/code/resend`;
export const SERVER_SEND_TOTP = `/api/${APP_VERSION}/cerberus/users/totp/new`;

export const SERVER_VERIFY_TOTP_CODE = `/api/${APP_VERSION}/cerberus/users/totp/verification`;

export const SERVER_REQUEST_CHANGE_PASSWORD = `/api/${APP_VERSION}/cerberus/users/password/change/request`;
export const SERVER_CHANGE_PASSWORD = `/api/${APP_VERSION}/cerberus/users/password/change`;
export const SERVER_RESET_PASSWORD = `/api/${APP_VERSION}/cerberus/users/password/reset/request`;

export const SERVER_SECURITY_IMAGE = `/api/${APP_VERSION}/cerberus/users/totp/image`;

export const SERVER_REFRESH_TOKEN = `/api/${APP_VERSION}/cerberus/token/refresh`;

export const SERVER_STATICS = `/api/${APP_VERSION}/repository`;

export const SERVER_PUT_PERSONAL_INFO = `/api/${APP_VERSION}/users/info/personal`;

export const SERVER_PUT_USER_ADDRESS = `/api/${APP_VERSION}/users/info/address`;

export const SERVER_GET_CITIES = `/api/${APP_VERSION}/info/cities/list`;

export const SERVER_UPDATE_PINE_CODE = `/api/${APP_VERSION}/cerberus/users/pin`;

export const SERVER_PATCH_USER_ADDRESS = `/api/${APP_VERSION}/order/user/address`;

export const SERVER_POST_COURIERS = `/api/${APP_VERSION}/order/delivery/couriers`;

export const SERVER_POST_DELIVERY_CALENDAR = `/api/${APP_VERSION}/order/delivery/slots/available`;

export const SERVER_POST_UPDATE_DELIVERY_SLOT = `/api/${APP_VERSION}/order/delivery/slots/update`;

export const SERVER_POST_DELIVERY_SUMMARY = `/api/${APP_VERSION}/order/delivery/summary`;

// export const SERVER_GET_WS_TICKET = `/api/${APP_VERSION}/auth/gabriel/pass`;

export const SERVER_ADVERTISMENT_CHANNELS = `/api/${APP_VERSION}/griffin/kyc/advertisements`;

export const SERVER_AUTH_STEP_THREE = `/api/${APP_VERSION}/griffin/kyc/info`;
export const SERVER_KYC_BASE_INFO = `/api/${APP_VERSION}/griffin/kyc/base-info`;

export const PRODUCT_UPLOAD = `/api/${APP_VERSION}/products/media/upload`;

export const USERS_MFA_EMAIL = `/api/${APP_VERSION}/cerberus/users/mfa/email`;
export const SERVER_SECRET_LIST = `/api/${APP_VERSION}/cerberus/users/mfa`;
export const USERS_MFA_GOOGLE = `/api/${APP_VERSION}/cerberus/users/mfa/app`;

export const SERVER_UPLOAD_SELPHI = `/api/${APP_VERSION}/griffin/upload`;
export const SERVER_GET_DOCUMENTS_BATCH = `/api/${APP_VERSION}/cerberus/user/files`;

export const SERVER_UPLOAD_NAME_DOCUMENT = `/api/${APP_VERSION}/griffin/kyc/documents`;

export const SERVER_USER_SHEBA_NUMBER = `/api/${APP_VERSION}/griffin/user/iban`;

export const SERVER_USER_BANK_CARD = `/api/${APP_VERSION}/griffin/user/bank-card`;
export const TICKET_HISTORY = `/api/${APP_VERSION}/ticket/history`;
export const TICKET_UPLOAD = `/api/${APP_VERSION}/ticket/upload`;
export const TICKET_DETAILS = `/api/${APP_VERSION}/ticket/listDetails`;

export const GET_CATEGORY_HISTORY = `/api/${APP_VERSION}/ticket/getCategories`;
export const SEND_TICKET = `/api/${APP_VERSION}/ticket/newTicket`;

export const SERVER_KYC_STATE = `/api/${APP_VERSION}/griffin/kyc/districts`;
export const SERVER_KYC_OTP = `/api/${APP_VERSION}/griffin/kyc/shahkar`;
export const SERVER_KYC_OTP_RESET = `/api/${APP_VERSION}/griffin/kyc/shahkar/resend`;

export const SERVER_EXCHANGE_ASSET = `/api/${APP_VERSION}/silkroad/asset`;

export const SERVER_CALENDER_RESERVE_TIME = `/api/${APP_VERSION}/griffin/kyc/schedule`;
export const SERVER_AUTH_LANDING_LINE = `/api/${APP_VERSION}/griffin/kyc/landline`;
export const SUBMIT_LANLINE = `/api/${APP_VERSION}/griffin/user/landline`;
export const VERIFY_LANLINE = `/api/${APP_VERSION}/griffin/user/verify/landline`;
export const SERVER_KYC_SUBMIT = `/api/${APP_VERSION}/griffin/kyc/submit`;
export const BANK_CARD_TEMPLATE = `/api/${APP_VERSION}/griffin/kyc/user/bank-card/templates`;

// profile
export const SERVER_AUTH_USER_PERSONAL_INFO = `/api/${APP_VERSION}/auth/users/personal-info`;

// exchange
export const SERVER_ASSET_NAMES = `/api/${APP_VERSION}/silkroad/asset`;

export const SERVER_EXCHANGE_MARKET = `/api/${APP_VERSION}/silkroad/market`;

export const SERVER_PRICE_TICKER = `/api/${APP_VERSION}/silkroad/price/ticker`;
// ACTIONS
export const SERVER_SUBMIT_ORDER = `/api/${APP_VERSION}/silkroad/orderbook/placement`;

export const SERVER_NEW_SUBSCRIPTION = `/api/${APP_VERSION}/cerberus/subscription`;

export const SERVER_MARKET_WATCH = `/api/${APP_VERSION}/silkroad/orderbook/watch`;

export const SERVER_USER_ORDERS = `/api/${APP_VERSION}/silkroad/user/orders`;

export const SERVER_PROFILE_INFO = `/api/${APP_VERSION}/cerberus/users/profile`;

export const ACTION_FORCE_ACTIVATE_ACCOUNT = 1001;

// WAREHOUSE
export const WAREHOUSE_BALANCE = `/api/${APP_VERSION}/accounting/warehouse/balance/user`;
export const WAREHOUSE_DEPOSIT_REQUEST = `/api/${APP_VERSION}/accounting/warehouse/deposit/request`;
export const WAREHOUSE_WITHDRAW_REQUEST = `/api/${APP_VERSION}/accounting/warehouse/withdraw/request`;
export const WAREHOUSE_CREATE_ACCOUNT = `/api/${APP_VERSION}/accounting/warehouse/account/create`;
export const FIAT_DEPOSIT_CALLBACK = `/api/${APP_VERSION}/fiat/deposit/callback`;
export const WAREHOUSE_USER_BALANCE = `/api/${APP_VERSION}/accounting//warehouse/balance/user`;
export const WAREHOUSE_DEPOSIT_LIST = `/${APP_VERSION}/accounting/warehouse/deposit/list`;
export const WAREHOUSE_DEPOSIT_SEARCH = `/api/${APP_VERSION}/accounting/warehouse/transaction/search`;
export const WAREHOUSE_LIMIT = `/api/${APP_VERSION}/accounting/warehouse/limits`;

export const LANGUAGE_FARSI = 2;
export const LANGUAGE_ENGLISH = 1;

export const ORDER_SIDE_BUY = 1;
export const ORDER_SIDE_SELL = 0;

export const UNAUTHORIZED_PURCHASE_EFFORT = -10;

export const MUST_SOLVE_CAPTCHA = -10000;
export const TASK_SHOULD_BE_PASSED = -10001;

export const CHANNEL_SMS = 0;
export const CHANNEL_EMAIL = 1;
export const CHANNEL_AUTHENTICATOR_APP = 2;
