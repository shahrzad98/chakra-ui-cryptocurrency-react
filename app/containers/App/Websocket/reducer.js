/*
 *
 * BlurredModal reducer
 *
 */
import produce from "immer";
import {
  ORDER_UPDATE_ACTION,
  PRICE_TICKER_ACTION,
  ORDERBOOK_UPDATE_ACTION,
} from "./constants";

export const initialState = { ticker: null, order: null, orderbook: null };

/* eslint-disable default-case, no-param-reassign */
const orderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRICE_TICKER_ACTION:
        draft.ticker = action.payload.ticker;

        break;
      case ORDER_UPDATE_ACTION:
        draft.order = action.payload.order;
        break;

      case ORDERBOOK_UPDATE_ACTION:
        draft.orderbook = action.payload.orderbook;
        break;
    }
  });

export default orderReducer;
