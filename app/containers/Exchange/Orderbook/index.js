import React, { useEffect, useState } from "react";
import { api } from "utils/network";
import { GetURL } from "utils/urlMap";

import Orders from "./Orders";

export default ({ market, baseAsset, quoteAsset }) => {
  const [orderbook, setOrderbook] = useState({
    asks: [],
    bids: [],
  });

  useEffect(() => {
    api.post(GetURL("market-watch"), { market: market }).then((response) => {
      const res = response.data.data?.Orderbook;
      setOrderbook(response.data.data?.Orderbook);
    });
  }, []);

  return (
    <Orders
      orderbook={orderbook}
      baseAsset={baseAsset}
      quoteAsset={quoteAsset}
    />
  );
};
