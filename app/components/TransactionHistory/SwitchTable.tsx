import React from "react"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Spacer,
  Box
} from '@chakra-ui/react';
import _map from "lodash/map"
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import RangePicker from "./RangePicker"

type SwitchTablePropTypes = {
  children: JSX.Element[]
}

const SwitchTable = ({children}: SwitchTablePropTypes) => {
  return (
    <Tabs isLazy margin="0px" padding="0">
      <TabList border="0px" marginBottom={{base: "16px", md: "13px"}} height={{base: "26px", md: "33px"}} background="#fff" padding="0">
        <Flex w="100%">
          <Tab _selected={{ background: "#f3f5f8" }} borderRadius="50px" borderBottom="0" color="#233a7d" padding={{base: "3px 14px", md: "6px 16px"}} margin="0" fontSize={{base: "13px", md: "14px"}} fontWeight="bold">
            <FormattedMessage {...messages.toman} />
          </Tab>
          <Tab _selected={{ background: "#f3f5f8" }} borderRadius="50px" borderBottom="0" color="#233a7d" padding={{base: "3px 14px", md: "6px 16px"}} margin="0" fontSize={{base: "13px", md: "14px"}} fontWeight="bold">
            <FormattedMessage {...messages.crypto} />
          </Tab>
          <Spacer />
          <Box>
            <RangePicker />
          </Box>
        </Flex>
      </TabList>
      <TabPanels background="#fff">
        {_map(children, (child, i) => (
          <TabPanel key={i} padding="0" margin="0" overflowX="auto">
            {child}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default SwitchTable