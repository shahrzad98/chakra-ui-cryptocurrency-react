import React from "react"
import { Flex, Button } from '@chakra-ui/react';
import NavLink from 'components/RXNavLink';

type assetsPropTypes = {}

const Assets = ({}: assetsPropTypes) => {
  return (
    <Flex direction="row" alignItems="center" justifyContent={{base: "start", md: "center"}} padding={{base: "11px 16px", md: "25px"}} background="#fff" height={{base: "57px", md: "90px"}} borderRadius="3px">
      <NavLink height="auto" to="/dashboard/depositandwithdraw">
        <Button
          width={{base: "62px", md: '110px' }}
          height={{base: "35px", md: '40px' }}
          fontSize={{base: "12px", md: "17px"}}
          color="#233a7d"
          background="#f5f7fa"
          _active={{ background: '#f5f7fa' }}
          _hover={{ background: '#f5f7fa' }}
        >
          برداشت
        </Button>
      </NavLink>
      <NavLink height="auto" to="/dashboard/depositandwithdraw">
        <Button
          marginRight="14px"
          width={{base: "62px", md: '110px' }}
          height={{base: "35px", md: '40px' }}
          fontSize={{base: "12px", md: "17px"}}
          background="#1652f0"
          _active={{ background: '#1652f0' }}
          _hover={{ background: '#1652f0' }}
          color="#fff"
        >
          واریز
        </Button>
      </NavLink>
    </Flex>
  )
}

export default Assets