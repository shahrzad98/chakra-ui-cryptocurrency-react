import React from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import { Box, Text } from '@chakra-ui/layout';
import { Flex, Button, Img } from '@chakra-ui/react';
import { FileText, MyCard } from '../../../../images/icon';
import uploadImg from '../../../../images/uploadimage.png';
const StepFive = ({ currentStep, onNextStep }) => (
  <>
    <Text
      marginTop={{ base: '28px', xl: '30px' }}
      marginBottom={{ base: '29px', xl: '22px' }}
      color="#fff"
      textAlign="center"
      
      fontSize={{ base: '24px', xl: '30px' }}
    >
      <FormattedMessage {...messages.SelfiePhoto} />
    </Text>

    <Box
      padding={{ base: '28px 30px 18px 30px', xl: '48px 30px 30px 30px' }}
      textAlign="center"
      bg="white"
      display="block"
      borderRadius="4px"
      margin="auto"
      overflow="hidden"
      w={{ xl: '480px', base: '94%' }}
    >
      <Text fontSize={{ base: '12px', xl: '16px' }} padding="0 15px" textAlign={{xl:"center",base:"center"}}>
        <FormattedMessage {...messages.ImageAuth} />
      </Text>

      <Box margin="0 auto" w="100%" >
        <Img margin="0 auto" src={uploadImg} />
      </Box>

      <Text color="#050f19" fontSize={{ base: '14px', xl: '16px' }} textAlign={{ base: 'center', xl: 'right' }}>
        <FormattedMessage {...messages.Valididentificationdocumentsareacceptable} />
      </Text>

      <Text
        marginTop={{ base: '8px', xl: '8px' }}
        color="#050f19"
        fontSize={{ base: '14px', xl: '16px' }}
        fontFamily="yekan"
        textAlign={{ base: 'center', xl: 'right' }}
      >
        <FormattedMessage {...messages.userdocuments} />
      </Text>
      <Text
        margin={{ base: '14px 0 0 0', xl: '20px 0 0 0' }}
        color="#050f19"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign={{ base: 'center', xl: 'right' }}
      >
        <FormattedMessage {...messages.Thetextoftheundertaking} />
      </Text>

      <Text
        margin="6px 0 0 0"
        color="#050f19"
        fontSize={{ base: '12px', xl: '16px' }}
        textAlign={{ base: 'center', xl: 'right' }}
        fontFamily="yekan"
      >
        <FormattedMessage {...messages.Stepsixsectionone} />
      </Text>

      
        <Button
          margin={{ base: '22px auto 0 auto', xl: '40px auto 0 auto' }}
          background="#1652F0"
          color="#fff"
          fontSize={{ xl: '20px', base: '13px' }}
          height={{ base: '47px', xl: '60px' }}
          borderRadius="4px"
          padding="20px 0"
          width={{ base: '100%' }}
          _hover={{
            background: '#1652F0',
          }}
          _active={{
            background: '#1652F0',
          }}
          onClick={e => {
            if (onNextStep) onNextStep(currentStep + 1);
          }}
        >
          {<FormattedMessage {...messages.nextStep} />}
        </Button>
      
    </Box>
  </>
);

export default StepFive;
