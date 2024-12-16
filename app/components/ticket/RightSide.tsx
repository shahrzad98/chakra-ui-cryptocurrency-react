/*
 *
 * DepositWithdraw
 *
 */

import React from 'react';
import BannerTicket from 'components/ticket/BannerTicket';
import { AccountCircle, Setting, Card, Unlock, History, TicketIcon, LogoutPanel } from '../../images/icon';

import { Box, Text, Flex } from '@chakra-ui/react';
import 'react-tabs/style/react-tabs.css';

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function RightSide(props: Props) {
  return (
    <>
      <Box display={{ md: 'block', base: 'none' }}>
        <BannerTicket />
        <Box padding="17px 24px" borderRadius="3px 3px 6px 6px" marginTop="10px" bg="#fff">
          <Flex>
            <AccountCircle height="44" width="44" />
            <Box paddingRight="11px">
              <Text color="#050f19">مهسا علیخانی</Text>
              <Text color="#788ca6">09128993918</Text>
            </Box>
          </Flex>

          <Box marginTop="10px" borderBottom="1px solid #f4f6fa" padding="0 10px" />

          <Box paddingTop="22px">
            <Flex>
              <Setting />
              <Text fontSize="13px" color="#708599" paddingRight="15px">
                اطلاعات حساب کاربری
              </Text>
            </Flex>
            <Flex marginTop="15px">
              <Card />
              <Text fontSize="13px" color="#708599" paddingRight="15px">
                اطلاعات بانکی
              </Text>
            </Flex>
            <Flex marginTop="15px">
              <Unlock />
              <Text fontSize="13px" color="#708599" paddingRight="15px">
                تنظیمات امنیتی
              </Text>
            </Flex>
            <Flex marginTop="15px">
              <History />
              <Text fontSize="13px" color="#708599" paddingRight="15px">
                تاریخچه ورود
              </Text>
            </Flex>
            <Flex marginTop="15px">
              <TicketIcon />
              <Text fontSize="13px" color="#050f19" paddingRight="15px">
                تیکت
              </Text>
            </Flex>
          </Box>

          <Box marginTop="18px" borderBottom="1px solid #f4f6fa" padding="0 10px" />

          <Flex marginTop="22px">
            <LogoutPanel />
            <Text color="#050f19" paddingRight="15px">
              خروج از حساب
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default RightSide;
