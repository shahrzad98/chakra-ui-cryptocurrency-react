import React from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { StepOneAuth } from '../../../../images/icon';
const StepTwo = ({ currentStep, onNextStep }) => (
  <>
    <Text
      marginTop={{ base: '22px', xl: '30px' }}
      marginBottom={{ base: '25px', xl: '22px' }}
      color="#fff"
      textAlign="center"
      fontSize={{ base: '24px', xl: '30px' }}
    >
      <FormattedMessage {...messages.AuthTitle} />
    </Text>
    <Box
      marginTop="24px"
      padding={{ base: '36px 30px 16px 30px', xl: '53px 34px 26px 34px' }}
      textAlign="center"
      bg="white"
      borderRadius="4px"
      margin="auto"
      w={{ xl: '480px',base:"94%" }}
    >
      <Flex justifyContent="center">
        <StepOneAuth display="inline-block !important" margin="0 auto" width="114px" height="114px" />
      </Flex>
      <Text
        margin={{ base: '20px auto', xl: '40px auto 30px auto' }}
        fontSize="18px"
        textAlign="center"
        color="#050f19"
      >
        <FormattedMessage {...messages.AuthInRabex} />
      </Text>

      <Text
        margin="10px auto"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekan"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepTowSectionOne} />
      </Text>

      <Text
        textAlign="center"
        fontFamily="yekanb"
        fontSize={{ base: '14px', xl: '16px' }}
        marginTop={{xl:"25px",base:"15px"}}
        color="#050F19"
      >
        <FormattedMessage {...messages.TermsandConditions} />
      </Text>
      <Text
        marginTop="6px"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekan"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepTowSectionTwo} />
      </Text>

      <Text
        marginTop={{xl:"30px",base:"15px"}}
        fontSize={{ base: '14px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekanb"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepsOfAuthentication} />
      </Text>
      <Text
        marginTop="6px"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekan"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepTowSectionThree} />
      </Text>
      <Text
        marginTop={{xl:"30px",base:"15px"}}
        fontSize={{ base: '14px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekanb"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepsOfAuthentication} />
      </Text>
      <Text
        marginTop="6px"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekan"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepTowSectionTwo} />
      </Text>
      <Text
        marginTop={{xl:"30px",base:"15px"}}
        fontSize={{ base: '14px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekanb"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepsOfAuthentication} />
      </Text>

      <Text
        marginTop="6px"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign="center"
        fontFamily="yekan"
        color="#050F19"
      >
        <FormattedMessage {...messages.StepTowSectionFour} />
      </Text>

      <Button
        background="#1652F0"
        color="#fff"
        borderRadius="4px"
        marginTop={{xl:"47px",base:"25px"}}
        height={{ base: '50px', xl: '60px' }}
        width={{ base: '100%', xl: '100%' }}
        onClick={() => {
          if (onNextStep) onNextStep(currentStep + 1);
        }}
        _hover={{
          backgroundColor: '#1652F0',
        }}
        _active={{
          backgroundColor: '#1652F0',
        }}
      >
        <FormattedMessage {...messages.Continues} />
      </Button>
    </Box>
  </>
);

export default StepTwo;
