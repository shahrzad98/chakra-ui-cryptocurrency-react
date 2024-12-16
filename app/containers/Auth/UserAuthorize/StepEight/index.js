import React, { useEffect, useState } from 'react';
import messages from '../messages';
import { FormattedMessage } from 'react-intl';
import Button from '../../../../components/RabexButton';
import { api } from '../../../../utils/network';
import { GetURL } from '../../../../utils/urlMap';
import Joi from 'joi';
import BankCardNumber from '../../../../components/BankCardNumber';
// import { toast } from "react-toastify";
import { useToast, Box, Text, Flex, Spacer } from '@chakra-ui/react';
import { PaymentCard, BankMelli } from '../../../../images/icon';
const StepEight = ({ currentStep, onNextStep }) => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  let form = {
    cardNumber: '',
  };

  const [bankCards, setBankCards] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    getAllCards();
  }, []);

  const printCardNumber = cardNo => cardNo.match(/.{1,4}/g).join('-');

  const schema = Joi.object({
    cardNumber: Joi.string().creditCard().label('cardNumber').messages({
      "string.base": `شماره کارت نمی تواند خالی باشد`,
      'string.creditCard': 'شماره کارت معتبر نیست',
    }),
  });

  const validate = () => {
    setStatus(false);
    const result = schema.validate(form);
    const err = {};
    let _error = '';

    if (result.error) {
      for (const item of result?.error?.details) {
        const path = item?.path.join('_');

        err[path] = item?.message;

        _error += item?.message;
        toastIdRef.current = toast({ description: _error, status: 'error' });
        setStatus(true);
      }

      return result.error;
    }
    api
      .put(GetURL('user-bank-card'), {
        card_number: form.cardNumber,
      })
      .then(response => {
        setStatus(true);
        getAllCards();
        setBankCards([...bankCards, response.data]);
      })
      .catch(error => {
        setStatus(true);
        if (error?.data?.error?.message)
          toastIdRef.current = toast({
            description: error?.data?.error?.message,
            // status: 'error',
          });
      });
  };

  const getAllCards = () => {
    /// cget whole the cards
    api.post(GetURL('user-bank-card')).then(response => {
      setBankCards(response?.data);
    });
  };

  return (
    <>
      <Text
        marginTop={{ base: '28px', xl: '30px' }}
        marginBottom={{ base: '29px', xl: '22px' }}
        color="#fff"
        textAlign="center"
        fontSize={{ base: '24px', xl: '30px' }}
      >
        <FormattedMessage {...messages.Cardbank} />
      </Text>
      <Box
        bg="#fff"
        w={{ base: '96%', xl: '480px' }}
        boxShadow="sm"
        borderRadius="4px"
        margin="0 auto"
        minHeight="366px"
      >
        <Box padding={{ base: '28px 20px 22px 20px', xl: '48px 31px 0 24px' }}>
          <Text textAlign="center" fontSize={{ base: '14px', xl: '16px' }} color="#050f19">
            <FormattedMessage {...messages.BuyJustYourCard} />
          </Text>

          <Text
            marginTop={{ base: '0', xl: '5px' }}
            fontFamily="yekan"
            textAlign="center"
            marginBottom="32px"
            fontSize={{ base: '14px', xl: '16px' }}
            color="#050f19"
            padding={{ base: '0', lg: '0 30px' }}
          >
            <FormattedMessage {...messages.Addcardtitle} />
          </Text>

          {bankCards?.map((value, key) => (
            <div key={key}>
              <Flex
                alignItems="center"
                dir="rtl"
                textAlign="left"
                border="1px solid #ECEFF1"
                height={{ base: '67px', xl: '103px' }}
                marginTop="12px"
              >
                {/* <Img display="inline-block" src={GetStatic(`icons/${value.logo}`)} /> */}
                <Box marginRight={{ base: '14px', xl: '20px' }} display="inline-block" height="31px" width="31px">
                  <BankMelli />
                </Box>

                <Box display="inline-block" marginTop="5px">
                  <Text paddingRight="9px" fontSize={{ base: '13px', xl: '17px' }}>
                    {printCardNumber(value?.card_number)}
                  </Text>
                </Box>

                <Spacer />
                {value?.verification_status == 0 ? (
                  <Text paddingLeft="24px" margin="0" fontSize={{ base: '11px', xl: '14px' }} color="#708599">
                    <FormattedMessage {...messages.Pending} />
                  </Text>
                ) : (
                  ''
                )}
                {value?.verification_status == 1 ? (
                  <Text paddingLeft="9px" margin="0" color="#05b169" fontSize={{ base: '11px', xl: '14px' }}>
                    <FormattedMessage {...messages.Accepted} />
                  </Text>
                ) : (
                  ''
                )}
                {value?.verification_status == 2 ? (
                  <Text paddingLeft="9px" margin="0" color="#dc2b2b" fontSize={{ base: '11px', xl: '14px' }}>
                    <FormattedMessage {...messages.Failed} />
                  </Text>
                ) : (
                  ''
                )}
              </Flex>
            </div>
          ))}
        </Box>
        <Box padding={{ base: '0', xl: '0 31px 0 24px' }}>
          <Flex
            border="1px solid #ECEFF1"
            textAlign="right"
            height={{ xl: '97px', base: '56px' }}
            marginTop="12px"
            alignItems="center"
            padding={{ xl: '0 14px' }}
            placeContent="space-evenly"
          >
            <BankCardNumber
              onLoad={response => {
                form = { ...form, cardNumber: response };
                validate();
              }}
              status={status}
            />
          </Flex>
        </Box>

        <Box padding={{ base: '28px 20px 22px 20px', xl: '0 31px 26px 24px' }}>
          <Button
            marginTop="48px"
            background="#1652F0"
            color="#fff"
            borderRadius="4px"
            padding="20px 0"
            height={{ base: '47px', xl: '60px' }}
            fontSize={{ xl: '20px', base: '11px' }}
            width="100%"
            text={<FormattedMessage {...messages.Continues} />}
            onClick={e => {
              if (bankCards?.length != null && bankCards?.length > 0) {
                if (onNextStep) onNextStep(currentStep + 1);
              } else {
                toastIdRef.current = toast({
                  description: 'شما می بایست حداقل یک کارت ثبت کرده باشید',
                });
              }
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default StepEight;
