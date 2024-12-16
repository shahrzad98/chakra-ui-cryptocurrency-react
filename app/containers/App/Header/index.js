import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Logo from 'images/logo_white.svg';
import LogoR from 'images/logoR.svg';
import HeaderDropDownProfile from './HeaderDropDownProfile';
import TokenManager from '../../../utils/TokenManager';
import LoginMenu from './login_menu';
import NavLink from 'components/RXNavLink';
import { Account, Refer, Trade, Wallet, Transaction, Ticket } from '../../../images/icon';
import useBreakpoint from '../../../helper/useBreakpoint';
import { useWindowSize } from '../../../helper';
export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const point = useBreakpoint();
  const {width} = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/*main header*/}
      <Box background="#1652f0">
        <Grid
          width="100%"
          zIndex={9}
          position="sticky"
          top="0"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(12, 1fr)"
          maxWidth="1330px"
          margin="0 auto"
        >
          <GridItem colSpan={12} bg="#1652f0">
            <Flex h={16} justifyContent={'space-between'}>
              <NavLink to="/dashboard">
                <Flex justifyContent="space-evenly" blockSize="inherit">
                  <Center margin="0 5px">
                    <LogoR width="30px" />
                  </Center>
                  {width > 420 && (
                    <Center margin="auto 5px">
                      <Logo width="60px" />
                    </Center>
                  )}
                </Flex>
              </NavLink>
              {TokenManager.authenticated() ? <HeaderDropDownProfile /> : <LoginMenu />}
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      {/* sub header */}

      {width > 991 && (
        <Box background="#fff">
          <Grid
            height="65px"
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(12, 1fr)"
            gap={0}
            zIndex="8"
            position="sticky"
            background="#fff"
            top="60px"
            alignItems="center"
            marginBottom="28px"
            maxWidth="1310px"
            margin="0 auto"
          >
            <GridItem colSpan={12}>
              <Flex color="white" width="100%">
                <NavLink to="/dashboard/buyandsell">
                  <Box
                    onClick={() => setActiveIndex(1)}
                    color={activeIndex === 1 ? '#065cca' : '#808080'}
                    borderBottom={activeIndex === 1 ? '1px solid #065cca' : 'none'}
                    display="flex"
                    justifyContent="space-evenly"
                    padding="15px"
                  >
                    <Trade fill={activeIndex === 1 ? '#065cca' : '#808080'} width={15} />
                    <Text margin="0 5px">{'معامله'}</Text>
                  </Box>
                </NavLink>

                <Box onClick={() => setActiveIndex(2)}>
                  <NavLink to="/dashboard/wallet">
                    <Box
                      padding="15px"
                      onClick={() => setActiveIndex(2)}
                      color={activeIndex === 2 ? '#065cca' : '#808080'}
                      borderBottom={activeIndex === 2 ? '1px solid #065cca' : 'none'}
                      display="flex"
                      justifyContent="space-evenly"
                    >
                      <Wallet width={15} fill={activeIndex === 2 ? '#065cca' : '#808080'} />
                      <Text margin="3px 5px">
                        <FormattedMessage {...messages.wallet} />
                      </Text>
                    </Box>
                  </NavLink>
                </Box>
                <NavLink to="/dashboard/profile">
                  <Box
                    onClick={() => setActiveIndex(3)}
                    color={activeIndex === 3 ? '#065cca' : '#808080'}
                    borderBottom={activeIndex === 3 ? '1px solid #065cca' : 'none'}
                    display="flex"
                    justifyContent="space-evenly"
                    padding="15px"
                  >
                    <Account width={15} fill={activeIndex === 3 ? '#065cca' : '#808080'} border={'none'} />
                    <Text margin="0 5px">
                      <FormattedMessage {...messages.Account} />
                    </Text>
                  </Box>
                </NavLink>

                <NavLink to="/dashboard/profile">
                  <Box
                    onClick={() => setActiveIndex(4)}
                    color={activeIndex === 4 ? '#065cca' : '#808080'}
                    borderBottom={activeIndex === 4 ? '1px solid #065cca' : 'none'}
                    display="flex"
                    justifyContent="space-evenly"
                    padding="15px"
                  >
                    <Refer
                      position="relative"
                      bottom="5px"
                      width={15}
                      fill={activeIndex === 4 ? '#065cca' : '#808080'}
                    />
                    <Text margin="0 5px">
                      <FormattedMessage id="app.containers.exchange.ReferralFriends" />
                    </Text>
                  </Box>
                </NavLink>

                <NavLink to="/dashboard/transaction">
                  <Box
                    onClick={() => setActiveIndex(5)}
                    color={activeIndex === 5 ? '#065cca' : '#808080'}
                    borderBottom={activeIndex === 5 ? '1px solid #065cca' : 'none'}
                    display="flex"
                    justifyContent="space-evenly"
                    padding="15px"
                  >
                    <Transaction width={13} fill={activeIndex === 5 ? '#065cca' : '#808080'} />
                    <Text margin="0 5px">
                      <FormattedMessage {...messages.Transaction} />
                    </Text>
                  </Box>
                </NavLink>
                <NavLink to="/dashboard/ticket">
                  <Box
                    onClick={() => setActiveIndex(6)}
                    color={activeIndex === 6 ? '#065cca' : '#808080'}
                    borderBottom={activeIndex === 6 ? '1px solid #065cca' : 'none'}
                    display="flex"
                    justifyContent="space-evenly"
                    padding="15px"
                  >
                    <Ticket fill={activeIndex === 6 ? '#065cca' : '#808080'} />
                    <Text margin="0 5px">تیکت</Text>
                  </Box>
                </NavLink>
                <Box textAlign="left" marginLeft="5px" flexGrow={2} alignSelf="center">
                  <NavLink to="#" color="#fff">
                    <Button
                      padding="20px 30px"
                      size="sm"
                      background="#08b874"
                      _hover={{
                        background: '#08b874',
                        color: '#fff',
                      }}
                      _focus={{
                        border: 'none',
                        background: '#08b874',
                        color: '#fff',
                      }}
                      _after={{
                        background: '#08b874',
                        color: '#fff',
                      }}
                      _active={{
                        background: '#08b874',
                        color: '#fff',
                      }}
                      border="none"
                    >
                      <FormattedMessage id="app.containers.HeaderTop.help" />
                    </Button>
                  </NavLink>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      )}

      <Box paddingBottom="20px" margin="0 auto" maxWidth="1440px" background="#f4f6fa">
        <Box
          width={['100%', '100%', '100%', '60%', '1120px']}
          margin="0 auto"
          padding="20px"
          background="#1652f0"
          textAlign="right"
        >
          <Flex alignSelf="center">
            <Image src={require('images/info-white.svg')} />
            <Box marginRight="20px">
              <Text color="#fff">غیرفعال شدن برداشت های ریالی</Text>
              <Text color="#fff" fontFamily="yekan">
                امکان برداشت تومانی از کیف پول به طور موقت تا ۲۴ ساعت دیگر وجود نخواهد بود
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Modal isOpen={false} onClose={onClose}>
        <ModalOverlay borderRadius="2px" />
        <ModalContent borderRadius="2px">
          <ModalBody>
            <Box textAlign="center" padding="0 50px">
              <Image margin="25px auto 0 auto" src={require('images/auth-gaurd.svg')} />
              <Text marginTop="30px" fontSize="22px">
                تایید احراز هویت
              </Text>
              <Text fontFamily="yekan" textAlign="center" marginTop="15px">
                کاربر گرامی، احراز هویت شما تایید شده است از این پس می‌توانید به معامله ارزهای دیجیتال در رابکس بپردازد
              </Text>
              <Button
                margin="30px auto 20px auto"
                borderRadius="3px"
                background="#1652f0"
                color="#fff"
                padding="25px"
                width="100%"
              >
                شروع
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
