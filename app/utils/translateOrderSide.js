import React from "react";
import { FormattedMessage } from "react-intl";
import * as constants from "./constants";

export const TranslateOrderSide = function(side) {
  switch (side) {
    case 0:
      return <FormattedMessage id="order.side.sell" />;
    case 1:
      return <FormattedMessage id="order.side.buy" />;
  }
};
