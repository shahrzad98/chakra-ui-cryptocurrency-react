/**
 *
 * UserCredit
 *
 */

import React, { useEffect, useState, memo } from 'react';
import Joi from 'joi';
import {
  Box,
  Stack,
  Center,
  Divider,
  HStack,
  VStack,
  Flex,
  Text
} from '@chakra-ui/react';
import P from 'components/P';
import Img from 'components/Img';
import { FormattedMessage } from 'react-intl';
import messages from '../../containers/User/messages';
import BankCardNumber from 'components/BankCardNumber';
import BankBorderBox from './BankBorderBox';
import ShebaNumber from 'components/ShebaNumber';
import { api } from '../../utils/network';
import { GetStatic, GetURL } from '../../utils/urlMap';
import TitleBar from 'components/TitleBar';
import { useHistory } from 'react-router';

function UserCredit() {
  useEffect(() => {
    getAllCards();
    getAllSheba();
  }, []);
  const history = useHistory();

  let form = {
    cardNumber: '',
  };

  let form_sheba = {
    shebaNumber: '',
  };

  const [bankCards, setBankCards] = useState([]);
  const [shebaNumbers, setShebaNumbers] = useState([]);
  const [changeCardNumber, setChangeCardNumber] = useState('');
  const [cardNumberId, setCardNumberId] = useState('');

  const getAllSheba = () => {
    api.get(GetURL('user-sheba-number')).then(response => {
      setShebaNumbers(response.data.data);
    });
  };
  const getAllCards = () => {
    /// get whole the cards
    api.post(GetURL('user-bank-card')).then(response => {
      setBankCards(response.data?.data);
    });
  };

  const printCardNumber = cardNo => {
    return cardNo.match(/.{1,4}/g).join('-');
  };

  const schema = Joi.object({
    cardNumber: Joi.string().creditCard().label('cardNumber'),
  });

  const validateCard = () => {
    const result = schema.validate(form);

    if (result.error) {
      for (let item of result?.error?.details) {
        // const path = item?.path.join("_");
        // const err = {};

        // err[path] = item?.message;

        // _error += item?.message;
      }

      return result.error;
    }

    if (cardNumberId != '') {
      deleteCard();
    } else {
      addCard();
    }
  };

  const deleteCard = () => {
    
    api
      .delete(GetURL('bank-card'),{data: {
        "user_bank_card_id": cardNumberId
    }})
      .then(response => {
        setCardNumberId('');
        addCard();
      })
      .catch(error => {
        if (error.data) {
        }
      });


    // const headers = {
    //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg5LjAuNDM4OS4xMTQgU2FmYXJpLzUzNy4zNiIsImF1ZCI6MSwiZXhwIjoxNjI3Mjc4ODA5LCJpYXQiOjE2MjQ2ODY4MDksImlwdjQiOiIxMjcuMC4wLjEiLCJpc3MiOiJSYWJleCBNaWNyb3NlcnZpY2UgQmFzZSBBcHAsIHZlcnNpb24gMS4wIiwicm9sZXMiOlsxLDJdLCJzY29wZXMiOlsid2Vic2l0ZSJdLCJzdWIiOiJSYWJleCBNaWNyb3NlcnZpY2UgQmFzZSBBcHAiLCJ1c2VyX3N1YiI6IjNkYjM3YWU2LTQzYTQtNDRhOS05MTU4LTY3Zjk2YTkzYmRiMyIsInVzZXJuYW1lIjoiOTEzMzg1MTc2OSJ9.Qc-60ueCQ2Y66vfdlzMkZXo21ACYER1P9ON5WILlshA',
    //   "Content-Type": "application/json"
    // }
    //    api
    //   .delete(GetURL('bank-card'), {
    //     data: {
    //       user_bank_card_id: cardNumberId
    //     },
    //     headers
    //   })
    //   .then(response => {
    //     setCardNumberId('');
    //     addCard();
    //   })
    //   .catch(error => {
    //     if (error.data) {
    //     }
    //   });
  };

  const addCard = () => {
    api
      .put(GetURL('bank-card'), {
        card_number: form.cardNumber,
      })
      .then(response => {
        getAllCards();
        setBankCards([...bankCards, response.data.data]);
      })
      .catch(error => {
        if (error.data) {
        }
      });
  };

  const validateShebaNumber = () => {
    api
      .put(GetURL('user-sheba-number'), {
        iban: form_sheba.shebaNumber,
      })
      .then(response => {
        getAllSheba();
      })
      .catch(error => {
        if (error.data) {
        }
      });
  };

  const changeCard = (cardNumber, id) => {
    setChangeCardNumber(cardNumber);
    setCardNumberId(id);
  };

  return (
    <>
      <VStack w="100%" marginTop="20px">
        <TitleBar
          children={<FormattedMessage {...messages.BankInfo} />}
          color="#fff"
          height="70px"
          width="100%"
          textAlign="right"
          icon={require('images/icons_wallet.svg')}
          background="rgb(22, 82, 240)"
        />
        <Box
          w={'100%'}
          boxShadow="md"
          padding="12px 10px"
          bg="#fff"
          textAlign="right"
        >
          <Flex
            onClick={e => {
              history.push(`/dashboard/profile`);
            }}
            textAlign="right"
            dir="rtl"
          >
            <Img src={require('images/icon _arrow_right.svg')} />
            <Text
              padding="0 10px 0 0"
              fontFamily="yekan"
            >{<FormattedMessage {...messages.Account} />}</Text>
          </Flex>
        </Box>
        <Box
          w={'100%'}
          boxShadow="md"
          padding="25px 10px"
          bg="#fff"
          textAlign="right"
        >
          <Text
            fontFamily="yekan"
          >{<FormattedMessage {...messages.onlyAcceptCard} />}</Text>
          <Text
            fontFamily="yekan"
           
          >{<FormattedMessage {...messages.onlyShebaNumber} />}</Text>
        </Box>

        <Stack w="100%" direction={['column', 'row']}>
          <Box
            width={{
              base: '100%',
              sm: '100%',
              md: '100%',
              lg: '50%',
              xl: '50%',
            }}
            textAlign="center"
            padding="20px 8px"
            boxShadow="base"
            rounded="sm"
            bg="white"
          >
            <Img
              margin="auto"
              
            />
            <Text
              margin="10px 0 0 0"
              fontSize="12px"
              
            >
              {<FormattedMessage {...messages.CardBankMe} />}
            </Text>

            {bankCards?.map((value, key) => (
              <div key={key}>
                <BankBorderBox>
                  <Img src={GetStatic(`icons/${value.logo}`)} />

                  <Box marginLeft="15px" width="100%" textAlign="left">
                    <Text
                      margin="5px 0 0 0 "
                      fontSize="12px"
                      text={printCardNumber(value?.card_number)}
                    >
                      {<FormattedMessage {...messages.CardBankMe} />}
                    </Text>
                    <Text
                      color="#708599"
                      textAlign="left"
                      margin="0"
                      fontSize="12px"
                    
                    >
                      {<FormattedMessage {...messages.notAccepted} />}
                    </Text>
                  </Box>
                  {
                    value?.verification_status==2
                    ?
                    <Box
                    display="flex"
                    onClick={e => {
                      changeCard(value?.card_number, value?.id);
                    }}
                  >
                    <Img src={require('images/edit-card.svg')} />
                  </Box>
                  :
                  ''
                  }
                
                </BankBorderBox>
              </div>
            ))}

            <Box padding="30px 8px" border="1px solid #ECEFF1">
              <HStack>
                <BankCardNumber
                  changeCard={changeCardNumber}
                  onLoad={response => {
                    form = { ...form, cardNumber: response };
                    validateCard();
                  }}
                />
                <Img  />
              </HStack>
            </Box>
          </Box>

          <Box
            width={{
              base: '100%',
              sm: '100%',
              md: '100%',
              lg: '50%',
              xl: '50%',
            }}
            boxShadow="base"
            padding="20px 8px"
            rounded="sm"
            bg="white"
          >
            <Img
              margin="auto"
              
            />
            <P
              margin="10px 0 0 0"
              fontSize="12px"
              textAlign="center"
              text={<FormattedMessage {...messages.MyShebaNumber} />}
            />

            {shebaNumbers?.map((value, key) => (
              <div key={key}>
                <BankBorderBox>
                  <P
                    margin="5px 0 0 0 "
                    fontSize="12px"
                    text={'IR' + value?.iban}
                  />
                  <P margin="0" fontSize="12px" text="" />

                  <Img src={GetStatic(`icons/${value?.logo}`)} />
                </BankBorderBox>
              </div>
            ))}

            <ShebaNumber
              onLoadSheba={response => {
                form_sheba = { ...form_sheba, shebaNumber: response };
                validateShebaNumber();
              }}
            />
          </Box>
        </Stack>
      </VStack>
    </>
  );
}

UserCredit.propTypes = {};

export default memo(UserCredit);
