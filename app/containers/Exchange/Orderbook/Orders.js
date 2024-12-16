import React, { useEffect, useState } from "react";
import { api } from "utils/network";
import { GetURL } from "utils/urlMap";
import * as constants from "utils/constants";
import { FormattedMessage } from "react-intl";
import {
  Td,
  Th,
  Tr,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Box,
} from "@chakra-ui/react";
import messages from "../messages";
import { useSelector } from "react-redux";
import { CalendarIcon } from "@chakra-ui/icons";

export default ({ orderbook, baseAsset, quoteAsset }) => {
  const { order } = useSelector((state) => {
    if (state.socketAction.order) {
      let m = state.socketAction.order;
      return { order: m?.payload };
    }
    return { order: null };
  });

  useEffect(() => {
    switch (order?.side) {
      case constants.ORDER_SIDE_SELL:
        const bids = bids?.filter(order.price);

        break;
      case constants.ORDER_SIDE_BUY:
    }
  }, [order, orderbook]);

  return (
    <Box overflowY="auto" h="40vh" w="100%">
      <Box
        color="white"
        m="auto"
        textAlign="center"
        borderWidth={1}
        borderRadius={5}
        borderColor="white"
        color="gray"
        p={2}
        mb={5}
      >
        <CalendarIcon mr={4} />
        {"   "} <FormattedMessage {...messages.exchange_orderbook} />
      </Box>

      <Table variant="unstyled" textAlign="center" m="auto" size="xs">
        <Thead>
          <Tr>
            <Th textAlign="center" color="gray" fontSize={10}>
              <FormattedMessage {...messages.asset_price} /> ({quoteAsset})
            </Th>

            <Th textAlign="center" color="gray" fontSize={10}>
              <FormattedMessage {...messages.exchange_amount} /> ({baseAsset})
            </Th>

            <Th textAlign="center" color="gray" fontSize={10}>
              <FormattedMessage id="order.total" />
            </Th>
          </Tr>
        </Thead>

        <Tbody color="red" textAlign="center">
          {Object.keys(orderbook?.asks).map((k) => (
            <Tr key={k} _hover={{ bg: "blue.700" }}>
              <Td textAlign="center">{orderbook?.asks[k].depth}</Td>
              <Td textAlign="center">{orderbook?.asks[k]?.price}</Td>
              <Td textAlign="center">
                {orderbook?.asks[k]?.price * orderbook?.asks[k].depth}
              </Td>
            </Tr>
          ))}
        </Tbody>

        <Tbody>
          <Tr>
            <Td textAlign="center" colSpan="3">
              ----
            </Td>
          </Tr>
        </Tbody>

        <Tbody color="green.400">
          {Object.keys(orderbook?.bids).map((k) => (
            <Tr key={k} _hover={{ bg: "blue.700" }}>
              <Td textAlign="center">{orderbook?.asks[k]?.depth}</Td>
              <Td textAlign="center">{orderbook?.bids[k]?.price}</Td>
              <Td textAlign="center">
                {orderbook?.bids[k]?.price * orderbook?.asks[k]?.depth}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
