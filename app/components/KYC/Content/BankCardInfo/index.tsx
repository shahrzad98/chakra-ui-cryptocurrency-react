import {
  Text,
  Image,
  Box,
  Divider,
  Flex,
  Input,
  Button,
  Alert,
  List,
  ListItem,
  Icon,
  InputGroup,
  InputRightElement,
  Spinner
} from '@chakra-ui/react';
import {spliteWithDashOnChange} from 'helper/MiscHelper';
import {useWindowSize} from 'helper/useWindowSize';
import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {api} from 'utils/network';
import {GetURL} from 'utils/urlMap';
import messages from '../../messages'
import CardItem from './CardItem';
import Shetab from 'iran-shetab'
import {size} from 'lodash';
import {useDispatch} from 'react-redux';
import {setBankCards} from 'containers/KYC/redux/actions';

const BankCardInfo: FC = () => {
  const {width} = useWindowSize();
  const [cardNumber, setCardNumber] = useState<string>('');
  const [bank, setBank] = useState<any>();
  const [bankTemplates, setBankTemplates] = useState<any>()
  const [userBankCards, setUserBankCards] = useState<any>([])
  const [loadingAddCard, setLoadingAddCard] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    setBank(bankTemplates?.find(el => cardNumber.replace("-", "").includes(el.card_prefix))?.logo)
  }, [cardNumber])

  useEffect(() => {
    api
      .get(GetURL('bank-card-template')).then(response => setBankTemplates(response?.data))
    api
      .post(GetURL('user-bank-card'), {impersonate_user_id: null}).then(response => {
      dispatch(setBankCards(response?.data))
      setUserBankCards(response?.data)
    })
  }, [])


  function addCard() {
    setLoadingAddCard(true)
    api
      .put(GetURL('user-bank-card'), {card_number: cardNumber.split("-").join("")}).then(()=> {
      setLoadingAddCard(false)
      setCardNumber('')
      api
        .post(GetURL('user-bank-card'), {impersonate_user_id: null}).then(response => {
        dispatch(setBankCards(response?.data))
        setUserBankCards(response?.data)
      })
    })
      .catch(()=>{
        setLoadingAddCard(false)
        setCardNumber('')
      })
  }

  const [clearCard, setClearCard] = useState(false)

  function keyDownHandle(e) {
    if (e.keyCode === 8) {
      if (cardNumber.substr(cardNumber?.length - 1) === "-") {
        setCardNumber(cardNumber.substr(0, cardNumber?.length))
      }
      setClearCard(true)
    }
  }

  function changeCardHandle(e) {
    setClearCard(false)
    setCardNumber(e.target.value.toString())
  }
  return (
    <Box w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}} className="kyc_section bankCardInfo">
      <Flex>
        <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
              className="title" marginLeft="5px">
          3.
        </Text>
        <Text paddingBottom={width < 768 ? "15px" : "unset"} fontFamily="yekanb" fontSize="20px" color="#1652f0"
              className="title">
          <FormattedMessage {...messages.bankCardInfo} />
        </Text>
      </Flex>
      <Divider background="#dedfe2" orientation="horizontal"/>
      <Flex flexDirection={width < 991 ? "column" : "row"} marginTop={width < 768 ? "12px" : "30px"}>
        <Box>
          <Text fontSize="18px" fontFamily="yekanb" color="#59636e" marginBottom="20px" alignSelf="center">
            <FormattedMessage {...messages.enterBankCard} />
          </Text>
          <Flex flexDirection={width < 768 ? "column" : "row"}>
            <InputGroup width="unset">
              <InputRightElement
                top="10%"
                pointerEvents='none'
                children={bank && <Box position="relative"  right={width > 768 ? "10px" : "15px"}> <Image width="30px"
                                                                                          src={`http://${window.location.host}/api/v1/static/icons/${bank}`}/></Box>}
              />
              <Input
                onKeyDown={e => keyDownHandle(e)}
                isInvalid={size(cardNumber) > 0 && !Shetab.isValid(cardNumber.replace('-', ''))}
                fontFamily="yekanb" fontSize="20px" color="#1652f0" textAlign="left"
                w={{base: "100%", lg: "415px"}} height="57px" marginBottom="12px"
                _focus={{border: "solid 1px #d6dade"}}
                _active={{border: "solid 1px #d6dade"}}
                value={clearCard ? cardNumber : spliteWithDashOnChange(cardNumber) || ''}
                placeholder="بانک
                     &emsp;&emsp;
                     0000-0000-0000-0000
                     "
                onChange={(e) => changeCardHandle(e)}/>
            </InputGroup>

            <Button disabled={loadingAddCard || !Shetab.isValid(cardNumber.replace('-', ''))} onClick={addCard} W={{base: "280px", lg: "105px"}} height="57px" background="#1652f0"
                    borderRadius="6px"
                    color="#fff" _hover={{background: "#1652f0"}} _active={{background: "#1652f0"}}
                    padding="17px 18px 16px 19px" margin="0 8px">
              <FormattedMessage {...messages.add} />
              {loadingAddCard && <Spinner color='#fff' size="sm" margin="0 5px"/>}
            </Button>
          </Flex>
          {!userBankCards?.length && <Alert w={{base: 'auto', lg: '526px'}} backgroundColor="#f5f7f7" borderRadius="3px"
                                            margin={width < 900 ? "20px 0" : "0"}>
            <Text color="#788ca6" fontSize="14px">
              <FormattedMessage {...messages.noCardYet} />
            </Text>
          </Alert>}
          {userBankCards && <Box marginTop={width < 768 ? "25px" : "unset"}>
            {userBankCards?.map(item => {
              return <CardItem logo={item.logo} verificationStatus={item.verification_status}
                               cardNumber={item.card_number}/>
            })}
          </Box>}
        </Box>
        <Box marginRight={width > 768 ? "50px" : 'unset'} marginTop={width < 768 ? "25px" : "unset"}>
          <Text color="#59636e" fontSize="18px" fontFamily="yekanb">
            <FormattedMessage {...messages.payAttention} />
          </Text>

          <List spacing={1} color="#59636e" margin="20px 0" fontSize={width < 768 ? "14px" : "16px"}>
            <ListItem w={{base: "240px", md: "100%"}}>
              <Text>
                <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <FormattedMessage {...messages.note1} />
              </Text>
            </ListItem>
            <ListItem w={{base: "240px", md: "100%"}}>
              <Text>
                <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <FormattedMessage {...messages.note2} />
              </Text>
            </ListItem>
            <ListItem w={{base: "240px", md: "100%"}}>
              <Text>
                <Icon viewBox="0 0 200 200" color="#CAD1DC" width="10px" marginLeft="8px">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <FormattedMessage {...messages.note3} />
              </Text>
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default BankCardInfo;
