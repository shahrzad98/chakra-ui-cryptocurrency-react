import * as React from 'react';
import { Center, Circle, Grid, Text } from '@chakra-ui/react';
import {
  Refer,
  Wallet,
  Trade,
  Transaction,
  Account,
} from '../../../images/icon';
import { Box } from '@chakra-ui/layout';
import { FormattedMessage } from 'react-intl';
import { useWindowSize } from '../../../helper';

type MobileFooterProps = {};

const MobileFooter: React.FC<MobileFooterProps> = () => {
  const {width} = useWindowSize();

  return (
    <Box
      padding="10px"
      position="sticky"
      bottom={0}
      width={width < 768 ? '100%' : '50%'}
      margin="0 auto"
      bg="#fff"
    >
      <Grid
        placeItems="center"
        templateColumns="repeat(5, 1fr)"
        gap={6}
        height={10}
      >
        <Center display="grid" w="100%" justifyItems="center">
          <Refer width={20} fill="#b1b4ce" />
          <Text color="#b1b4ce" fontSize="10px" marginTop="5px">
            <FormattedMessage id="app.containers.exchange.Refer" />
          </Text>
        </Center>
        <Center w="100%" display="grid" justifyItems="center">
          <Transaction width={20} fill="#b1b4ce" />
          <Text color="#b1b4ce" fontSize="10px" marginTop="5px">
            <FormattedMessage id="app.containers.exchange.Transaction" />
          </Text>
        </Center>
        <Circle
          alignSelf="center"
          w="30px"
          h="30px"
          bg="#1652f0"
          display="grid"
        >
          <Trade fill="#fff" width={15} />
        </Circle>
        <Center w="100%" display="grid" justifyItems="center">
          <Wallet width={20} fill="#b1b4ce" />
          <Text color="#b1b4ce" fontSize="10px" marginTop="5px">
            <FormattedMessage id="app.containers.exchange.Wallet" />
          </Text>
        </Center>
        <Center w="100%" display="grid" justifyItems="center">
          <Account fill="transparent" width={20} />
          <Text color="#b1b4ce" fontSize="10px" marginTop="5px">
            <FormattedMessage id="app.containers.exchange.Account" />
          </Text>
        </Center>
      </Grid>
    </Box>
  );
};

export default MobileFooter;
