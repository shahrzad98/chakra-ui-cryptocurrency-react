/**
 *
 * BuyAndSell
 *
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Stack, Box, Flex } from '@chakra-ui/layout';
import Input from 'components/Input';
import Button from 'components/RabexButton';
import { SearchIcon } from '@chakra-ui/icons';
import { MetroArrowLeft, BTC, Arrow } from '../../images/icon';
import {
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Img,
  Spacer,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useDispatch } from 'react-redux';
import { setBlur } from 'containers/BlurredModal/actions';
export const BuyAndSell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [currencyName, setCurrencyName] = useState();
  const [currencyAlias, setCurrencyAlias] = useState();
  const [currencyImage, setCurrencyImage] = useState();

  const dispatch = useDispatch();

  const BuyByWallet = () => {
    dispatch(
      setBlur('', {
        message: 'ssss',
      }),
    );
  };

  const currencySelected = (name, alias, image) => {
    setCurrencyName(name);
    setCurrencyAlias(alias);
    setCurrencyImage(image);
  };

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Stack
        dir="rtl"
        background="#fff"
        margin="0 auto"
        w={{ base: '100%', xl: '80%' }}
        direction={['column', 'row']}
        padding="25px 56px"
      >
        <Box
          w={{ base: '100%', xl: '462px' }}
          marginLeft="20px"
          border="1px solid #eceff1"
        >
          <Tabs size="md" variant="enclosed" borderRadius="0">
            <TabList borderRadius="0">
              <Tab
                height="80px"
                transition="0"
                w="100%"
                onClick={e => {
                  setActiveTab(0);
                }}
                borderRadius="0"
                borderTop={activeTab == 0 ? '2px solid #1652f0' : ''}
                borderTopColor={activeTab == 0 ? '#1652f0 !important' : ''}
              >
                خرید
              </Tab>
              <Tab
                height="80px"
                transition="0"
                w="100%"
                onClick={e => {
                  setActiveTab(1);
                }}
                borderRadius="0"
                borderTop={activeTab == 1 ? '2px solid #1652f0' : ''}
                borderTopColor={activeTab == 1 ? '#1652f0 !important' : ''}
              >
                فروش
              </Tab>
              <Tab
                height="80px"
                transition="0"
                w="100%"
                onClick={e => {
                  setActiveTab(2);
                }}
                borderRadius="0"
                borderTop={activeTab == 2 ? '2px solid #1652f0' : ''}
                borderTopColor={activeTab == 2 ? '#1652f0 !important' : ''}
              >
                تبدیل
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box position="relative">
                  
                    <Box
                      id="exchange"
                      display={isOpen ? 'block' : 'none'}
                      w="100%"
                      position="absolute"
                      zIndex="9"
                      color="white"
                      height="450px"
                      rounded="sm"
                      shadow="md"
                      background="#fff"
                      textAlign="center"
                      border="1px solid #7e8b9a"
                    >
                      <Box
                        height="40px"
                      >
                        <Box
                          display="inline-block"
                          verticalAlign="middle"
                          textAlign="right"
                          w="28px"
                          float= "right"
                          marginTop="14px"
                          paddingRight="14px"
                          onClick={e => {
                            setIsOpen(false);
                          }}
                        >
                          <MetroArrowLeft />
                        </Box>

                        <Text
                          textAlign="center"
                          color="#050f19"
                          marginTop="8px"
                          display="inline-block"
                        >
                          ارز خود را انتخاب کنید
                        </Text>
                      </Box>

                      <Box>
                        <InputGroup height="40px" dir="rtl">
                          <InputLeftElement
                            right="0"
                            children={<SearchIcon color="gray.300" />}
                          />
                          <Input
                            height="38px !important"
                            background="#f7f8fc"
                            paddingRight="30px"
                            border="1px solid #f7f8fc"
                            borderRadius="0"
                            type="text"
                            placeholder="جست و جو"
                          />
                        </InputGroup>
                      </Box>

                      <Flex
                        verticalAlign="middle"
                        textAlign="right"
                        padding="10px 20px"
                        onClick={e => {
                          currencySelected('بیت کوین', 'BTC', 'btc.svg');
                        }}
                      >
                        <Box w="24px">
                          <BTC />
                        </Box>
                        <Box display="inline-block" verticalAlign="middle">
                          <Text padding="0 10px 0 0" color="#050f19">
                            بیت کوین
                          </Text>
                          <Text
                            fontFamily="graphik"
                            padding="0 10px 0 0"
                            color="#7e8b9a"
                          >
                            Bitcoin BTC
                          </Text>
                        </Box>

                        <Spacer />

                        <Box
                          display="inline-block"
                          float="left"
                          textAlign="left"
                        >
                          <Text color="#7e8b9a">0.00156</Text>
                          <Text color="#7e8b9a">52.672.738</Text>
                        </Box>
                      </Flex>

                      <Box
                        verticalAlign="middle"
                        textAlign="right"
                        padding="10px 20px"
                        background="#fafafa"
                        onClick={e => {
                          currencySelected('تتر', 'USDT', 'tether.svg');
                        }}
                      >
                        <Img
                          display="inline"
                          height="26px"
                          src={require('images/tether.svg')}
                        />
                        <Box display="inline-block" verticalAlign="middle">
                          <Text padding="0 10px 0 0" color="#050f19">
                            تتر
                          </Text>
                          <Text
                            fontFamily="graphik"
                            padding="0 10px 0 0"
                            color="#7e8b9a"
                          >
                            Tether USDT
                          </Text>
                        </Box>

                        <Box
                          display="inline-block"
                          float="left"
                          textAlign="left"
                        >
                          <Text color="#7e8b9a">0.00156</Text>
                          <Text color="#7e8b9a">52.672.738</Text>
                        </Box>
                      </Box>
                    </Box>
              

                  <Input
                    fontSize="38px"
                    textAlign="center"
                    height="140px"
                    placeholder="0 تومان"
                  />

                  <Box>
                    <Box
                      marginLeft="16px"
                      borderRadius="4px"
                      padding="4px 14px"
                      display="inline-block"
                      border="2px solid #eceff1"
                    >
                      <Box
                        marginLeft="3px"
                        display="inline-block"
                        verticalAlign="baseline"
                      >
                        <Arrow />
                      </Box>

                      {/* <Img
                        marginLeft="3px"
                        display="inline-block"
                        verticalAlign="baseline"
                        src={require('images/arrow.svg')}
                      /> */}

                      <Text
                        color="#7e8b9a"
                        marginLeft="3px"
                        display="inline-block"
                        verticalAlign="top"
                      >
                        به
                      </Text>
                      <Text
                        color="#7e8b9a"
                        fontFamily="graphik"
                        display="inline-block"
                      >
                        {currencyAlias ? currencyAlias : 'BTC'}
                      </Text>
                    </Box>
                    <Text
                      color="#7e8b9a"
                      display="inline-block"
                      fontFamily="graphik"
                    >
                      1BTC ≈ 950,881,098 Toman
                    </Text>

                    <Box
                      position="relative"
                      display="flex"
                      alignItems="center"
                      marginTop="30px"
                      padding="1rem 0.8rem"
                      borderRadius="5px 5px 0 0"
                      direction="rtl"
                      id="buy_dropdown"
                      border="1px solid #eceff1"
                      pointerEvents="auto"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      <Box
                        float="right"
                        display="inline-block"
                        textAlign="right"
                      >
                        <Text
                          textAlign="right"
                          color="#7e8b9a"
                          display="inline-block"
                          fontSize="16px"
                          fontFamily="yekan"
                        >
                          {<FormattedMessage {...messages.buy} />}
                        </Text>
                      </Box>

                      <Box
                        position="absolute"
                        textAlign="center"
                        left="0"
                        right="0"
                        verticalAlign="middle"
                        display="inline-block"
                        pointerEvents="none"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <Img
                          marginRight="36px"
                          height="24px"
                          display="inline-block"
                          src={require(`images/${
                            currencyImage ? currencyImage : 'btc.svg'
                          }`)}
                        />
                        <Text display="inline-block" marginRight="20px">
                          {currencyName ? currencyName : ' بیت کوین '}
                        </Text>
                        <Text
                          verticalAlign="top"
                          marginRight="6px"
                          display="inline-block"
                          fontFamily="graphik"
                        >
                          {currencyAlias ? currencyAlias : ' BTC '}
                        </Text>
                      </Box>

                      <Box position="absolute" left="15px">
                        <Img src={require('images/arrowright.svg')} />
                      </Box>
                    </Box>

                    <Box
                      position="relative"
                      display="flex"
                      alignItems="center"
                      padding="1rem 0.8rem"
                      borderRadius="0 0 5px 5px"
                      direction="rtl"
                      border="1px solid #eceff1"
                    >
                      <Box
                        float="right"
                        display="inline-block"
                        textAlign="right"
                      >
                        <Text
                          textAlign="right"
                          display="inline-block"
                          color="#7e8b9a"
                          fontSize="16px"
                          fontFamily="yekan"
                        >
                          {<FormattedMessage {...messages.Paymentfrom} />}
                        </Text>
                      </Box>

                      <Box
                        width="100%"
                        position="absolute"
                        textAlign="center"
                        left="0"
                        right="0"
                        verticalAlign="middle"
                        display="inline-block"
                      >
                        <Img
                          marginRight="36px"
                          height="24px"
                          display="inline-block"
                          src={require('images/wallet.svg')}
                        />
                        <Text display="inline-block" marginRight="20px">
                          کیف پول تومانی
                        </Text>
                      </Box>

                      <Box position="absolute" left="15px">
                        <Img src={require('images/arrowright.svg')} />
                      </Box>
                    </Box>

                    <Box marginTop="25px">
                      <Button
                        width="100%"
                        fontSize="16px"
                        padding="30px 0"
                        background="#1652f0"
                        color="#fff"
                        onClick={e => {
                          BuyByWallet();
                        }}
                      >
                        پیش نمایش خرید
                      </Button>
                    </Box>

                    <Box marginTop="15px">
                      <Text
                        display="inline-block"
                        color="#7e8b9a"
                        float="right"
                      >
                        موجودی تومانی کیف پول
                      </Text>
                      <Text display="inline-block">2500000 تومان</Text>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <p>فروش</p>
              </TabPanel>
              <TabPanel>
                <p>تبدیل</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          w={{ base: '100%', xl: '766px', '2xl': '1000px' }}
          border="1px solid #eceff1"
        >
          <Box position="relative">
            <Flex>
              <Box display="inline-block">
                <List textAlign="right" padding="25px">
                  <ListItem color="#1652f0" display="inline-block">
                    سال
                  </ListItem>
                  <ListItem
                    color="#b7c0ca"
                    marginRight={{ base: '15px', md: '30px' }}
                    display="inline-block"
                  >
                    ماه
                  </ListItem>
                  <ListItem
                    color="#b7c0ca"
                    marginRight={{ base: '15px', md: '30px' }}
                    display="inline-block"
                  >
                    هفته
                  </ListItem>
                  <ListItem
                    color="#b7c0ca"
                    marginRight={{ base: '15px', md: '30px' }}
                    display="inline-block"
                  >
                    روز
                  </ListItem>
                  <ListItem
                    color="#b7c0ca"
                    marginRight={{ base: '15px', md: '30px' }}
                    display="inline-block"
                  >
                    همه
                  </ListItem>
                </List>
              </Box>
              <Spacer />
              <Box marginLeft="20px" display="flex" alignItems="center">
                <Select
                  fontFamil="graphik"
                  _focus="#fff"
                  lineHeight="2.60"
                  dir="ltr"
                  border="0"
                  outline="0"
                >
                  <option value="option1">BTC</option>
                  <option value="option2">ETH</option>
                  <option value="option3">ADA</option>
                </Select>
              </Box>
            </Flex>

            <Box position="absolute" bottom="-5px" left="0" marginLeft="34px">
              <Text
                marginLeft="20px"
                color="#05b169"
                display="inline-block"
                dir="ltr"
                fontFamily="graphikr"
              >
                + 265.24 (2.78%)
              </Text>

              <Text
                display="inline-block"
                dir="ltr"
                fontSize="22px"
                fontFamily="graphikr"
              >
                8,985 USDT
              </Text>
            </Box>
          </Box>
          <Box marginTop="20px" bg="gray.100" height="290px">
            chart
          </Box>

          <Box w="100%" paddingRight={{ base: '20px', md: '0' }}>
            <Box
              marginTop={{ base: '15px', md: '0' }}
              display="inline-block"
              w={{ base: '50%', md: '25%' }}
              textAlign="right"
            >
              <Text color="#97a2ae">بالاترین قیمت دوران</Text>
              <Text dir="ltr"> 61,736,837 USDT</Text>
            </Box>
            <Box
              marginTop={{ base: '15px', md: '0' }}
              display="inline-block"
              w={{ base: '50%', md: '25%' }}
              textAlign="right"
            >
              <Text color="#97a2ae">دارایی در جریان</Text>
              <Text dir="ltr"> 2.19 BTC</Text>
            </Box>
            <Box
              marginTop={{ base: '15px', md: '0' }}
              display="inline-block"
              w={{ base: '50%', md: '25%' }}
              textAlign="right"
            >
              <Text color="#97a2ae">حجم گردش روزانه</Text>
              <Text dir="ltr"> 2.19 BUSDT</Text>
            </Box>
            <Box
              marginTop={{ base: '15px', md: '0' }}
              display="inline-block"
              w={{ base: '50%', md: '25%' }}
              textAlign="right"
            >
              <Text color="#97a2ae">حجم بازار</Text>
              <Text dir="ltr"> 225.19 BUSDT</Text>
            </Box>
          </Box>
          <Box w="100%">
            <Stack w="100%" direction={['column', 'row']} marginTop="20px">
              <Box
                textAlign="center"
                w={{ base: '100%', md: '50%' }}
                marginRight={{ base: '15px', md: '40px' }}
                textAlign="right"
              >
                <Text color="#97a2ae">مقایسه خرید و فروش</Text>
                <Text
                  verticalAlign="super"
                  fontSize="16px"
                  color="#0ba066"
                  display="inline-block"
                >
                  فروش 40٪
                </Text>
                <Box
                  verticalAlign="sub"
                  w={{ base: '54%', md: '40%' }}
                  display="inline-block"
                >
                  <Box
                    display="inline-block"
                    marginTop="8px"
                    w="40%"
                    backgroundImage=" linear-gradient(90deg, #0ba066 25%, #ffffff 25%, #ffffff 50%, #0ba066 50%, #0ba066 75%, #ffffff 75%, #ffffff 100%)"
                    backgroundSize="12px 50px"
                    backgroundRepeat="repeat-x"
                    height="28px"
                  />

                  <Box
                    display="inline-block"
                    marginTop="8px"
                    w="60%"
                    backgroundImage=" linear-gradient(90deg, #7e8b9a 25%, #ffffff 25%, #ffffff 50%, #7e8b9a 50%, #7e8b9a 75%, #ffffff 75%, #ffffff 100%);"
                    backgroundSize="12px 50px"
                    backgroundRepeat="repeat-x"
                    height="28px"
                  />
                </Box>
                <Text
                  verticalAlign="super"
                  fontSize="16px"
                  color="#97a2ae"
                  display="inline-block"
                >
                  خرید 60
                </Text>
              </Box>
              <Box
                w={{ base: '100%', md: '50%' }}
                textAlign="center"
                padding="18px"
              >
                <Button
                  // img={require("images/circle-arrow.svg")}
                  PaddingImg="0 0 0 6px"
                  margin="0 10px"
                  color="#7e8b9a"
                  border="1px solid #7e8b9a"
                  background="#fff"
                  verticalAlign="text-bottom"
                >
                  دریافت
                </Button>
                <Button
                  transformImg="rotate(180deg)"
                  // img={require("images/circle-arrow.svg")}
                  PaddingImg="0 6px 0 0"
                  margin="0 10px"
                  color="#7e8b9a"
                  border="1px solid #7e8b9a"
                  background="#fff"
                  verticalAlign="text-bottom"
                >
                  برداشت
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

BuyAndSell.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(BuyAndSell);
