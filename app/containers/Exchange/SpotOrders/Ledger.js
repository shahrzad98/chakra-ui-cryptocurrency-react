import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  TableCaption,
  Table,
  Td,
  Tbody,
  Thead,
  Tr,
  Th,
  Stack,
} from "@chakra-ui/react";
import {
  Paginator,
  Previous,
  Next,
  PageGroup,
  Container,
} from "chakra-paginator";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { api } from "utils/network";
import { TranslateOrderSide } from "../../../utils/translateOrderSide";
import { GetURL } from "../../../utils/urlMap";

const Ledger = () => {
  const { order } = useSelector((state) => {
    if (state.socketAction.order) {
      let m = state.socketAction.order;
      return { order: m.payload };
    }
    return { order: null };
  });
  const [ledger, setLedger] = useState([]);

  const [page, setPage] = useState({
    current: 1,
    total: 1,
    perPage: 5,
  });
  useEffect(() => {
    getOrders(1);
  }, [order]);

  const getOrders = (current) => {
    api
      .get(`${GetURL("user-orders")}?page=${current}&per_page=${page.perPage}`)
      .then((response) => {
        setPage({
          ...page,
          total: parseInt(
            Math.ceil(response.data.data?.pagination?.total_count / 5)
          ),
        });

        setLedger(response.data.data);
      });
  };

  const removeOrder = (oid) => {
    api
      .delete(GetURL("user-orders"), {
        data: {
          order: oid,
        },
      })
      .then((response) => {
        getOrders(page.current);
      });
  };
  return (
    <Stack bg="gray.900" w="100%" h="50vh" overflowY="auto">
      <Table color="white" textAlign="center" m="auto" size="xs">
        <Thead>
          <Tr>
            <Th>Market</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Side</Th>
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ledger?.list?.map((value, key) => {
            return (
              <Tr key={key}>
                <Td>{value?.exchange_market?.symbol}</Td>

                <Td>{value.price}</Td>
                <Td>{value.quantity}</Td>
                <Td>{TranslateOrderSide(value.side)}</Td>
                <Td textAlign="center">
                  <DeleteIcon
                    cursor="pointer"
                    color="red"
                    onClick={(e) => removeOrder(value.oid)}
                  />
                </Td>
              </Tr>
            );
          })}
          <Tr>
            <Td colSpan={5}>
              <Paginator
                isDisabled={false}
                innerLimit={5}
                outerLimit={5}
                pagesQuantity={page.total}
                onPageChange={(e) => getOrders(e)}
                normalStyles={{ width: 7, color: "black" }}
                separatorStyles={{ w: 7 }}
                currentPage={ledger?.pagination?.page}
                activeStyles={{ w: 7, bg: "whatsapp.400" }}
              >
                <Container
                  align="center"
                  justify="space-between"
                  w="full"
                  p={4}
                >
                  <Previous colorScheme="gray.400">
                    <ArrowLeftIcon />
                    {/* Or an icon from `react-icons` */}
                  </Previous>
                  <PageGroup isInline align="center" />
                  <Next colorScheme="gray.400">
                    <ArrowRightIcon />
                  </Next>
                </Container>
              </Paginator>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Stack>
  );
};

export { Ledger };
