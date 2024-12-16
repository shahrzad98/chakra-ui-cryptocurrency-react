import React from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import { Box, Text, Button } from '@chakra-ui/react';
import { StepOneAuth } from '../../../../images/icon';

const StepOne = ({ onNextStep, currentStep }) => (
  <>
    <Text
      marginTop={{ base: '28px', xl: '30px' }}
      marginBottom={{ base: '29px', xl: '22px' }}
      color="#fff"
      textAlign="center"
      fontSize={{ base: '24px', xl: '30px' }}
    >
      <FormattedMessage {...messages.AuthTitle} />
    </Text>

    <Box
      marginTop="24px"
      textAlign="center"
      bg="white"
      borderRadius="4px"
      margin="auto"
      w={{ xl: '480px', base: '94%' }}
    >
      <Box paddingTop="36px" display="flex" justifyContent="center">
        <StepOneAuth width="114px" height="114px" />
      </Box>
      <Text
        margin={{ base: '20px auto', xl: '40px auto 30px auto' }}
        fontSize={{xl:"18px",base:"16px"}}
        textAlign="center"
        color="#050f19"
      >
        <FormattedMessage {...messages.AuthInRabex} />
      </Text>

      <Text
        textAlign="center"
        padding="0 30px"
        fontSize={{ base: '12px', xl: '16px' }}
        fontFamily="yekan"
        color="#708599"
      >
        <FormattedMessage {...messages.StepOneDes} />
      </Text>
      <Button
        background="#1652F0"
        color="#fff"
        height={{ base: '50px', xl: '60px' }}
        marginTop={{ base: '20px', xl: '48px' }}
        marginBottom="26px"
        marginLeft="auto"
        fontSize={{xl:"18px",base:"13px"}}
        marginRight="auto"
        borderRadius="4px"
        padding="10px"
        width={{ base: '263px', xl: '420px' }}
        _hover={{
          backgroundColor: '#1652F0',
        }}
        _active={{
          backgroundColor: '#1652F0',
        }}
        onClick={() => {
          if (onNextStep) onNextStep(currentStep + 1);
        }}
      >
        <FormattedMessage {...messages.Start} />
      </Button>
    </Box>
  </>
);

export default StepOne;
