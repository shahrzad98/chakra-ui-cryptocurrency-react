import React, { useEffect, useState } from 'react';
import P from '../../../../components/P';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/RabexButton';
import Input from '../../../../components/Input';
import Img from '../../../../components/Img';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import { Box, useToast, Text, Flex } from '@chakra-ui/react';
import { MessageIcon } from '../../../../images/icon';
const StepFour = ({ currentStep, onNextStep }) => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  let form = {
    otpCode: '',
  };

  const sendOtp = () => {
    if (form.otpCode.length == 5) {
      api
        .put(GetURL('griffin-kyc-otp'), {
          otp: form.otpCode,
        })
        .then(response => {
          if (onNextStep) onNextStep(currentStep + 1);
          toastIdRef.current = toast({
            description: 'ثبت کد با موفقیت انجام شد',
            status: 'success',
          });
        })
        .catch(error => {
          toastIdRef.current = toast({
            description: 'ثبت کد انجام نشد',
            status: 'error',
          });
        });
    } else {
      toastIdRef.current = toast({
        description: 'کد شاهکار می بایست ۵ رقم باشد',
        status: 'error',
      });
    }
  };

  const reSendOtp = () => {
    api
      .put(GetURL('griffin-kyc-otp-resend'), {})
      .then(response => {
        toastIdRef.current = toast({
          description: 'کد دوباره ارسال شد',
          status: 'success',
        });
      })
      .catch(error => {
        toastIdRef.current = toast({
          description: 'ارسال کد با خطا مواجه شد',
          status: 'error',
        });
      });
  };

  return (
    <>
      <Text   marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '36px' }}>
        {<FormattedMessage {...messages.SMSConfirmation} />}
      </Text>
      <Box
        padding={{base:"24px 58px 27px 48px",xl:"35px 27px"}}
        textAlign="center"
        bg="white"
        
        borderRadius="sm"
        margin="auto"
        w={{base:"98%",xl:"520px"}}
      >
        <Text
          fontSize={{base:"12px",xl:"18px"}}
          textAlign="center"
          fontFamily="yekan"
          color="#050F19"
        >
          {<FormattedMessage {...messages.sendNumberSixPart} />}
        </Text>

        <Flex justifyContent="center" alignItems="center" marginTop={{base:"18px",xl:"25px"}}>
          <Input
            display="inline"
            width={{base:"109px !important",xl:"158px !important"}}
            display="inline-flex"
            borderRadius="2px"
            type="number"
            height={{base:"47px",xl:"69px"}}
            border="1px"
            marginLeft={{base:"16px",xl:"24px"}}
            textAlign="left"
            onInputChange={event => {
              form = { ...form, otpCode: event.target.value };
            }}
          />

          <MessageIcon />
        </Flex>

        <Box textAlign="center">
          <Button
            fontFamily="yekan"
            margin={{base:"31px 0 29px 0",xl:"45px  0 54px 0"}}
            background="#fff"
            focus="#fff"
            hover="#fff"
            fontSize={{base:"12px",xl:"18px"}}
            onClick={e => {
              reSendOtp();
            }}
            text={<FormattedMessage {...messages.resendSMS} />}
            color="#1652F0"
          />
        </Box>

        <Button
          background="#1652F0"
          color="#fff"
          borderRadius="4px"
          padding="20px 0"
          fontSize={{base:"11px",xl:"22px"}}
          height={{base:"47px",xl:"72px"}}
          width="100%"
          text={<FormattedMessage {...messages.Continues} />}
          onClick={e => {
            sendOtp();
          }}
        />
      </Box>
    </>
  );
};

export default StepFour;
