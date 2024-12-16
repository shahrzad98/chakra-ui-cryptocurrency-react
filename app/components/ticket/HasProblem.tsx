/*
 *
 * DepositWithdraw
 *
 */

import React from 'react';
import { Text, Spacer, Button, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router';

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HasProblem(props: Props) {
  const history = useHistory();

  return (
    <>
      <Box
        display={{ base: 'block', lg: 'flex' }}
        alignItems="center"
        marginTop="10px"
        padding={{ base: '20px 40px', xl: '30px 40px 30px 0' }}
        background="#fff"
        textAlign={{ base: 'center', xl: 'right' }}
      >
        <Text display={{ base: 'inline-block', xl: 'block' }} color="#233a7d" fontSize={{ base: '12px', xl: '16px' }}>
          مشکلتون هنوز حل نشده؟
        </Text>
        <Text
          display={{ base: 'inline-block', xl: 'block' }}
          color="#233a7d"
          fontSize={{ base: '12px', xl: '16px' }}
          fontFamily="yekan"
        >
          برای ما تیکت جدید ارسال کنید
        </Text>
        <Spacer />
        <Button
          marginTop={{ base: '15px', xl: '0' }}
          onClick={e => {
            history.push(`/dashboard/ticket/send`);
          }}
          marginLeft="40px"
          borderRadius="3px"
          fontSize="12px"
          background="#1650e9"
          _hover={{ background: '#1650e' }}
          _active={{ background: '#1650e' }}
          color="#fff"
          width="126px"
          height="38px"
        >
          ایجاد تیکت جدید
        </Button>
      </Box>
    </>
  );
}

export default HasProblem;
