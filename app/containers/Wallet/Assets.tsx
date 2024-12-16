import React from "react"
import { Flex, Text } from '@chakra-ui/react';
import Eye from "images/icon/eye-wallet.svg"
import { separateDigitNumber } from '../../helper';

type assetsPropTypes = {}

const Assets = ({}: assetsPropTypes) => {
  return (
    <Flex direction="column" justifyContent="center" padding={{base: "16px", md: "0px 40px"}} background="#fff" height={{base: "135px", md: "90px"}} borderRadius="3px" gridGap="5px">
      <Flex alignItems="center">
        <Text fontSize={{ base: '14px', md: '16px' }} marginLeft="9px" fontFamily="yekan" color="#000000">
          جمع دارایی های شما :
        </Text>
        <Eye />
      </Flex>
      <Flex direction={{base: "column", md: "row"}} alignItems={{base: "unset", md: "center"}} justifyContent={{base: "unset", md: "space-between"}} gridGap={{base: "5px", md: "unset"}}>
        <Flex alignItems="center">
          <Text fontSize={{ base: '18px', md: '25px' }} color="#1650e9">
            {`${separateDigitNumber(286937937)}≈`}
          </Text>
          <Text fontSize={{ base: '13px', md: '18px' }} marginX="8px" color="#708599">
            تومان
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Text
            color="#233a7d"
            fontSize={{ base: "14px", md: '26px' }}
            marginLeft="8px"
            fontFamily="graphik"
            dir="ltr"
          >
            ≈0.3726
          </Text>
          <Text
            fontSize={{ base: "13px", md: '20px' }}
            color="#708599"
            fontFamily="graphikr"
          >
            BTC
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Text
            color="#233a7d"
            fontSize={{ base:"14px", md: '26px' }}
            marginLeft="8px"
            fontFamily="graphik"
            dir="ltr"
          >
            ≈0.3726
          </Text>
          <Text
            fontSize={{ base:"13px", md: '20px' }}
            color="#708599"
            fontFamily="graphikr"
          >
            USDT
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Assets