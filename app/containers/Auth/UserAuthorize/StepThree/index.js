import React, { useEffect, useState } from 'react';
import BaseFormInformation from 'components/AuthBaseInformationForm';
import { Box, Text } from '@chakra-ui/react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';

const StepThree = ({ currentStep, onNextStep }) => (
  <>
    <Box display="block" overflow="hidden">
      <Text
        marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '30px' }}
      >
        <FormattedMessage {...messages.Basicinformation} />
      </Text>
      <BaseFormInformation status="send" onNextStep={onNextStep} currentStep={currentStep} />
    </Box>
  </>
);

export default StepThree;
