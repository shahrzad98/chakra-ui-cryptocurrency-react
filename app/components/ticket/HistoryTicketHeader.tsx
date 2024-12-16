import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { Flex, Spacer, Text, Box } from '@chakra-ui/react';
import { Paper } from '../../images/icon';
import { useHistory } from 'react-router';

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HistoryTicketHeader(props: Props) {
  const history = useHistory();

  return (
    <>
      <Flex alignItems="center" background="#fff" padding="0 20px" lineHeight="60px">
        <Text
          color="#233a7d"
          fontSize={{ base: '14px', xl: '16px' }}
          display="inline-block"
          borderBottom="2px solid #233a7d"
        >
          تیکت پشتیبانی
        </Text>
        <Spacer />
        <Flex
          padding="0 14px"
          height="36px"
          alignItems="center"
          background="#f3f5f8"
          borderRadius="20px"
          color="#233a7d"
        >
          <Box display={{ base: 'none', xl: 'block' }}>
            <Paper />
          </Box>
          <Text
            cursor="pointer"
            fontSize={{ sm: '12px' }}
            onClick={e => {
              history.push(`/dashboard/ticket`);
            }}
            marginRight={{ base: '0', xl: '8px' }}
          >
            تاریخچه پشتیبانی
          </Text>
        </Flex>
      </Flex>
      <Box borderBottom="1px solid #f4f6fa" />
    </>
  );
}

export default HistoryTicketHeader;
