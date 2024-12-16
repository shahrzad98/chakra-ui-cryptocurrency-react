import React from "react"
import styled from "styled-components"
import _map from "lodash/map"
import {
  Flex,
  Text,
  Box,
  Divider,
  useClipboard,
} from "@chakra-ui/react"
import { CopyIcon } from '@chakra-ui/icons'
import { FormattedMessage } from 'react-intl';
import messages from "./messages"

export type DrawerContentPropTypes = {
  status: "succeeded" | "failed" | "pending" | "paying";
  amount: {
    lang?: "en" | "fa";
    des?: string | JSX.Element;
    key: string | JSX.Element;
    value: string;
  };
  source: {
    key: string | JSX.Element;
    value: string;
  };
  transactionId: {
    key: string | JSX.Element;
    value: string;
  };
  items: {
    key: string | JSX.Element;
    value: string | JSX.Element;
  }[];
}


const Block = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  border-radius: 3px;
  flex-direction: row;
  align-items: center;
  padding: 10px 22px;
  position: relative;
  background-color: #e9ecef;
  justify-content: space-between;
  &:first-child::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 40px;
    background-color: #708599;
    position: absolute;
    bottom: 4px;
    right: 23px;
  }
  &:first-child::before {
    content: "";
    width: 0px;
    height: 15px;
    border-left: 1px dashed #708599;
    position: absolute;
    bottom: -15px;
    right: 25px;
  }
  &:nth-child(2)::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 40px;
    background-color: #708599;
    position: absolute;
    top: 4px;
    right: 23px;
  }
`

const Status = styled.div`
  color: #fff;
  height: 48px;
  display: flex;
  margin: 2px 4px;
  border-radius: 3px;
  align-items: center;
  width: calc(100% - 8px);
  justify-content: center;
  @media (max-width: 768px) {
    height: 39px
  }
  &.succeeded {
    background-color: #4aab9a;
  }
  &.failed {
    background-color: #ff2323;
  }
  &.pending {
    background-color: #fccd24;
  }
  &.paying {
    background-color: #fccd24;
  }
`

const statusVariant = {
  succeeded: <FormattedMessage {...messages.succeeded} />,
  failed: <FormattedMessage {...messages.failed} />,
  pending: <FormattedMessage {...messages.pending} />,
  paying: <FormattedMessage {...messages.paying} />,
}

const DrawerContent = ({ status, items, amount, source, transactionId }: DrawerContentPropTypes) => {
  const { hasCopied, onCopy } = useClipboard(transactionId.value)

  return (
    <Flex direction="column" gridRowGap="8px">
      <Flex borderRadius="6px" background="#fff" direction="column" gridRowGap={{base: "6px", md: "15px"}} padding={{base: "17px 16px", md: "22px 18px"}}>
        <Block>
          <Text fontSize={{base: "10px", md: "12px"}} fontWeight="bold">{amount.key}</Text>
          <Flex direction={amount.lang === "en" ? "row" : "row-reverse"} alignItems="center">
            <Text fontFamily={amount.lang === "en" ? "graphik" : "yekan"} fontSize={amount.lang === "en" ? "12px" : "11px"} color={amount.lang === "en" ? "#788ca6" : "#050f19"} marginX="4px">{amount.des}</Text>
            <Text {...(amount.lang === "en" && {fontFamily: "graphik"})} fontSize={{base: "10px", md: "12px"}}>{amount.value}</Text>
          </Flex>
        </Block>
        <Block>
          <Text fontSize={{base: "10px", md: "12px"}} fontWeight="bold">{source.key}</Text>
          <Text fontSize={{base: "10px", md: "12px"}} fontWeight="bold" fontFamily="yekan, sans-serif">{source.value}</Text>
        </Block>
        <Block>
          <Text fontSize={{base: "10px", md: "12px"}} fontWeight="bold">{transactionId.key}</Text>
          <Flex cursor="pointer" onClick={onCopy} direction="row" alignItems="center">
            <Text fontFamily="yekan" fontSize={{base: "10px", md: "12px"}}>{transactionId.value}</Text>
            {hasCopied ? <CopyIcon w="15px" h="15px" color="#4aab9a" margin="0 3px 3px" /> : <CopyIcon w="15px" h="15px" margin="0 3px 3px" /> }
          </Flex>
        </Block>
      </Flex>
      <Flex borderRadius="6px" background="#fff" direction="column" gridRowGap="15px" padding="29px 18px 22px">
        <Flex direction="column" gridRowGap="17px">
          {_map(items, (item, i) => (
            <Flex key={i} direction="row" alignItems="center">
              <Text fontSize={{base: "10px", md: "12px"}} fontWeight="bold">{item.key}</Text>
              <Box height="0px" flex="1" borderBottom="1px dashed #dbe3f1" marginX="5px"/>
              <Text direction="ltr" fontSize={{base: "10px", md: "12px"}} fontFamily="yekan">{item.value}</Text>
            </Flex>
          ))}
        </Flex>
        <Divider orientation='horizontal' background="#e9ecef" marginY="18px" />
        <Status className={status}>
          <Text fontSize={{base: "13px", md: "16px"}} fontWeight="bold" color="inherit">{statusVariant[status]}</Text>
        </Status>
      </Flex>
    </Flex>
  )
}

export default DrawerContent
