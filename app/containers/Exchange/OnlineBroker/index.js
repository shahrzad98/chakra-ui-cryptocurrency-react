import React, { Component, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetURL } from "utils/urlMap";
import { api } from "utils/network";

import {
  Box,
  Stack,
  RadioGroup,
  TabList,
  VStack,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import TitleBar from "components/TitleBar";
import messages from "../messages";
import { FormattedMessage } from "react-intl";
import * as constants from "utils/constants";
import TradeBox from "./TradeBox";
import Orderbook from "../Orderbook";
import { CandleStick } from "./candlestick";
import { SpotOrders } from "../SpotOrders";

const OnlineBroker = () => {
  const history = useHistory();
  const [market, setMarket] = useState({
    selected: history.location?.state?.currencyPair,
    data: [],
  });

  useEffect(() => {
    api
      .patch(GetURL("new-subscription"), {
        market: market?.selected?.quote?.id,
      })
      .then((response) => {
      });
  }, []);

  const submitOrder = (o, side) => {
    api
      .put(GetURL("submit-order"), {
        order_type: 1,
        quantity: o.qty,
        price: o.price,
        side,
        exchange_market_id: market?.selected?.quote?.id,
      })
      .then((response) => {
      });
  };

  return (
    <Stack
      w={["base", "xl", "100%"]}
      m="auto"
      minH="100vh"
      direction={["column", "row"]}
      bg={"gray.900"}
      p="3"
    >
      <VStack>
        <Orderbook
          market={market?.selected?.quote?.id}
          baseAsset={market.selected?.base?.name}
          quoteAsset={market.selected?.quote?.name}
        />
        <Stack w="sm" dir="rtl" borderRadius="10px">
          <Box textAlign="center">
            <Tabs isFitted variant="enclosed" size="sm">
              <TabList m="3">
                <Tab
                  _selected={{ color: "white", bg: "red.500" }}
                  color="white"
                >
                  <FormattedMessage id="order.side.sell" />
                </Tab>

                <Tab
                  _selected={{ color: "white", bg: "green.500" }}
                  color="white"
                >
                  <FormattedMessage id="order.side.buy" />
                </Tab>
              </TabList>

              <Tabs m="8" size="sm" variant="enclosed">
                <TabList>
                  <Tab
                    fontSize={12}
                    _selected={{ color: "white" }}
                    color="gray"
                  >
                    {" "}
                    <FormattedMessage {...messages.order_type_market} />
                  </Tab>
                  <Tab
                    fontSize={12}
                    isDisabled
                    _selected={{ color: "white" }}
                    color="gray"
                  >
                    <FormattedMessage {...messages.order_type_limit} />
                  </Tab>

                  <Tab
                    fontSize={12}
                    isDisabled
                    _selected={{ color: "white" }}
                    color="gray"
                  >
                    <FormattedMessage {...messages.order_type_stop} />
                  </Tab>
                </TabList>
              </Tabs>

              <TabPanels mt="-10">
                <TabPanel>
                  <TradeBox
                    gas={100}
                    price={2000}
                    rate={2000}
                    colorScheme="red"
                    buyOrSell={
                      <FormattedMessage {...messages.exchange_side_sell} />
                    }
                    baseAsset={market.selected?.base?.name}
                    quoteAsset={market.selected?.quote?.name}
                    onSubmit={(e) => submitOrder(e, constants.ORDER_SIDE_SELL)}
                  />
                </TabPanel>

                <TabPanel>
                  <TradeBox
                    colorScheme={"green"}
                    gas={100}
                    price={2000}
                    rate={1 / 2000}
                    buyOrSell={
                      <FormattedMessage {...messages.exchange_side_buy} />
                    }
                    quoteAsset={market.selected?.quote?.name}
                    baseAsset={market.selected?.base?.name}
                    onSubmit={(e) => submitOrder(e, constants.ORDER_SIDE_BUY)}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </VStack>

      <VStack w="100%">
        <CandleStick market={market?.selected?.quote?.symbol} />

        <SpotOrders />
      </VStack>
    </Stack>
  );
};

export default OnlineBroker;
