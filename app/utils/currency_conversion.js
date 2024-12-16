import { CURRENCY_IRR_ID, CURRENCY_IRT_ID, CURRENCY_USD_ID } from "./constants";
const scope = "app.utils";

export const CurrencyConversion = (price, currency) => {
  switch (currency) {
    case CURRENCY_IRR_ID:
      return {
        Price: price,
        Fx: 1,
        Currency: {
          id: `${scope}.currency.irr`,
        },
      };
    case CURRENCY_IRT_ID:
      return {
        Price: price * 10,
        Fx: 10,
        Currency: {
          id: `${scope}.currency.irt`,
        },
      };
    default:
      return {
        Price: price,
        Fx: 260000,
        Currency: {
          id: `${scope}.currency.usd`,
        },
      };
  }
};
