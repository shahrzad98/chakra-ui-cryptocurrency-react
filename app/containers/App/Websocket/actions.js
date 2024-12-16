/*
 *
 * BlurredModal actions
 *
 */
import React from "react";
import {
  ORDER_UPDATE_ACTION,
  PRICE_TICKER_ACTION,
  ORDERBOOK_UPDATE_ACTION,
} from "./constants";

export function publishPriceTickerEvent(ticker) {
  return {
    type: PRICE_TICKER_ACTION,
    payload: {
      ticker,
    },
  };
}

export function publishOrderUpdateEvent(order) {
  return {
    type: ORDER_UPDATE_ACTION,
    payload: {
      order,
    },
  };
}

export function publishOrderbookUpdateEvent(orderbook) {
  return {
    type: ORDERBOOK_UPDATE_ACTION,
    payload: {
      orderbook,
    },
  };
}
