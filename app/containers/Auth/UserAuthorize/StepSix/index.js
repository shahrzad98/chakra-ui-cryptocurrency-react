import React, { useEffect, useState } from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/RabexButton';
import Img from '../../../../components/Img';
import { Box, Text } from '@chakra-ui/layout';
import {CardPage} from "../../../../images/icon";
const StepSix = ({ currentStep, onNextStep }) => {
  return (
    <>
      <Text  marginTop={{ base: '28px', xl: '30px' }}
      marginBottom={{base:"29px",xl:"22px"}}
      color="#fff"
      textAlign="center"
      fontSize={{base:"24px",xl:"36px"}}>
        {<FormattedMessage {...messages.SelfiePhoto} />}
      </Text>
      <Box
        padding="66px 33px 44px 32px"
        textAlign="center"
        bg="white"
        borderRadius="sm"
        margin="auto"
        w={{xl:"580px",base:"98%"}}
      >
        
        <Box display="flex" justifyContent="center">
        <CardPage />
        </Box>

        <Text margin={{base:"30px 0 0 0",xl:"47px 0 0 0"}} color="#050f19" fontSize="18px" textAlign={{base:"center",xl:"right"}}>
          {
            <FormattedMessage
              {...messages.Valididentificationdocumentsareacceptable}
            />
          }
        </Text>
        <Text margin={{base:"16px 0 0 0",xl:"6px 0 0 0"}} color="#050f19" fontSize={{base:"16px",xl:"18px"}}  fontFamily="yekan" textAlign={{base:"center",xl:"right"}}>
          {<FormattedMessage {...messages.userdocuments} />}
        </Text>

        <Text margin={{base:"30px 0 0 0",xl:"20px 0 0 0"}} color="#050f19" fontSize={{base:"12px",xl:"18px"}} textAlign={{base:"center",xl:"right"}}>
          {<FormattedMessage {...messages.Thetextoftheundertaking} />}
        </Text>

        <Text margin="6px 0 0 0" color="#050f19" fontSize={{base:"12px",xl:"18px"}} textAlign={{base:"center",xl:"right"}} fontFamily="yekan">
          {<FormattedMessage {...messages.Stepsixsectionone} />}
        </Text>
        <Text margin={{base:"30px 0 0 0",xl:"20px 0 0 0"}} color="#050f19" fontSize={{base:"12px",xl:"18px"}}  textAlign={{base:"center",xl:"right"}}>
          {<FormattedMessage {...messages.Attention} />}
        </Text>
        <Text margin={{base:"14px 0 0 0",xl:"6px 0 0 0"}} color="#050f19" fontSize={{base:"12px",xl:"18px"}}  fontFamily="yekan" textAlign={{base:"center",xl:"right"}}>
          {<FormattedMessage {...messages.Stepsixsectiontwo} />}
        </Text>

        <Button
          margin="40px 0 0 0 "
          background="#1652F0"
          color="#fff"
          height={{base:"47px",xl:"83px"}}
          fontSize={{base:"11px",xl:"22px"}}
          borderRadius="4px"
          padding="20px 0"
          width={{base:"263px",xl:"100%"}}
          text={<FormattedMessage {...messages.Continues} />}
          onClick={e => {
            if (onNextStep) onNextStep(currentStep + 1);
          }}
        />
      </Box>
    </>
  );
};

export default StepSix;
