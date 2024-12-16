import React from "react"
import styled from "styled-components"
import _map from "lodash/map"
import { Flex, Text, useClipboard } from "@chakra-ui/react"
import { CheckIcon, CloseIcon, CopyIcon, DragHandleIcon } from '@chakra-ui/icons'
import {FormattedMessage} from 'react-intl';

import {useWindowSize} from 'helper/useWindowSize';
import messages from "./messages"

type TransactionRowProps = {
  id?: string;
  status?: {
    variant: "succeeded" | "failed" | "pending" | "paying";
    confirm?: string;
  };
  transactionId?: string;
  crypto?: {
    name: string;
    channel: string;
  };
  date?: string[];
  cardno?: string;
  sheba?: string;
  to?: {
    value: string;
    tag?: string;
  };
  amount?: {
    value: string;
    des: string;
    lang?: "fa" | "en"
  };
  onClick?: () => void,
  dateDirection?: "row" | "row-reverse" | "column" | "column-reverse"
}

const ID = styled.div`
  justify-self: center;
  grid-area: id;
`
const Status = styled.div`
  display: flex;
  grid-area: status;
  flex-direction: row;
  align-items: center;
  &.succeeded {
    color: #4aab9a;
  }
  &.failed {
    color: #ff2323;
  }
  &.pending {
    color: #fccd24;
  }
  &.paying {
    color: #fccd24;
  }
`

const statusVariant = {
  succeeded: {
    icon: <CheckIcon w="10px" h="10px" color="inherit" marginBottom="3px"/>,
    title: <FormattedMessage {...messages.succeeded} />
  },
  failed: {
    icon: <CloseIcon w="7px" h="7px" color="inherit" marginBottom="3px"/>,
    title: <FormattedMessage {...messages.failed} />
  },
  pending: {
    icon: <CheckIcon w="10px" h="10px" color="inherit" marginBottom="3px"/>,
    title: <FormattedMessage {...messages.pending} />
  },
  paying: {
    icon: <CheckIcon w="10px" h="10px" color="inherit" marginBottom="3px"/>,
    title: <FormattedMessage {...messages.paying} />
  }
}

const TransactionRow = ({ dateDirection, id, status, transactionId, crypto, date, amount, onClick, cardno, sheba, to }: TransactionRowProps) => {
  const { hasCopied, onCopy } = useClipboard(transactionId || "")
  const { width } = useWindowSize()
  const isMobile = width < 768 ? true : false

  return (
    <>
      {id && <ID>{id}</ID>}
      {status && (
        <Status className={status.variant} style={{ justifyContent: isMobile ? "end" : "start"}}>
          {statusVariant[status.variant].icon}
          <Flex direction="column" margin={{base: "0 5px 0", md: "0 10px"}}>
            <Text fontSize={{base: "12px", md: "14px"}} color="inherit">{statusVariant[status.variant].title}</Text>
            {status.confirm && <Text marginTop="2px" fontSize="12px" color="inherit">{status.confirm}</Text>}
          </Flex>
        </Status>
      )}
      {transactionId && (
        <Flex style={{gridArea: "transactionId"}} onClick={onCopy} direction="row" alignItems="center">
          <Text fontFamily="yekan" fontSize="14px" color="#050f19" marginLeft="5px">{transactionId}</Text>
          {hasCopied ? <CopyIcon w="15px" h="15px" color="#4aab9a" marginBottom="3px" /> : <CopyIcon w="15px" h="15px" marginBottom="3px" /> }
        </Flex>
      )}
      {crypto && (
        <Flex style={{gridArea: "crypto"}} direction={{base: "row", md: "column"}}>
          <Text fontSize="12px" color="#050f19" margin={{base:"0 0 0 4px", md:"0 0 4px 0"}}>{crypto.name}</Text>
          <Text fontFamily="graphik" fontSize="11px" color="#73768c">{crypto.channel}</Text>
        </Flex>
      )}
      {date && (
        <Flex style={{gridArea: "date"}} direction={dateDirection ? dateDirection : {base: "row-reverse", md: "column"}} {...(isMobile ? {justifyContent: "start"} : {alignItems: "end"})}>
          {_map(date, (item, i) => <Text key={i} fontSize={{base: "12px", md: "14px"}} color="#050f19" marginTop={{base: "0px", md: `${i*4}px`}} marginLeft={{base: `${i*4}px`, md: "0px"}}>{item}</Text>)}
        </Flex>
      )}
      {cardno && (
        <Flex style={{gridArea: "cardno"}} justifyContent="center">
          <Text fontFamily="yekan" fontSize="14px" color="#050f19">{cardno}</Text>
        </Flex>
      )}
      {sheba && (
        <Flex style={{gridArea: "sheba"}} justifyContent="center">
          <Text fontFamily="yekan, sans-serif" fontSize="14px" color="#050f19">{sheba}</Text>
        </Flex>
      )}
      {to && (
        <Flex style={{gridArea: "to"}} justifyContent="center">
          <Flex direction="column">
            <Text fontFamily="graphikr" fontSize="12px" color="#050f19">{to.value}</Text>
            {to.tag && <Text fontFamily="graphik" fontSize="12px" color="#050f19" marginTop="4px">TAG:{to.tag}</Text>}
          </Flex>
        </Flex>
      )}
      {amount && (
        <Flex style={{gridArea: "amount"}} direction={amount.lang === "en" ? "row" : "row-reverse"} alignItems="center" justifyContent="end">
          <Text fontFamily={amount.lang === "en" ? "graphik" : "yekan"} fontSize={amount.lang === "en" ? {base: "12px", md: "14px"} : "11px"} color={amount.lang === "en" ? "#788ca6" : "#050f19"} marginX="4px">{amount.des}</Text>
          <Text {...(amount.lang === "en" && {fontFamily: "graphik"})} fontSize={{base: "12px", md: "14px"}} color="#050f19">{amount.value}</Text>
        </Flex>
      )}
      {onClick && (
        <Flex style={{gridArea: "action"}} cursor="pointer" onClick={() => onClick()} justifyContent="center">
          <DragHandleIcon color="#788ca6" />
        </Flex>
      )}
    </>
  )
}

export default TransactionRow