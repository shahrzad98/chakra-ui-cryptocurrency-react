/*
 *
 * DepositWithdraw
 *
 */

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { CustomCheckbox, CustomInputText } from '../../components/Core/index';
import _ from 'lodash';
import Links from '../../components/Links';
import Hint from '../../components/Hint';
import CustomTab from '../../components/Tab';
import Stack from '../../components/Stack';
import CustomTabList from '../../components/TabList';
import CustomTabPanel from '../../components/TabPanel';
import Wallet from '../../components/Wallet';
import Paper from '../../components/Paper';
import Typography from '../../components/Typography';
import Drawer from 'components/Drawer';
import DataPanel from 'components/DataPanel';
import BtcIcon from '../../images/btc.svg';
import Qr from '../../images/qr.svg';
import BankPasargadIcon from '../../images/Bank-Pasargad.svg';
import InfoCircleIcon from '../../images/icons-info-circle.svg';
import InfoSquare from 'images/info-square.svg';
import PaymentSuccess from 'images/payment-success.svg';
import { InfoModal, RedAlert, Reject, ClockIcon, Accept, Help } from '../../images/icon';
import { GetStatic, GetURL } from '../../utils/urlMap';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  Link,
  Input,
  RadioGroup,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spacer,
  useDisclosure,
  Img,
} from '@chakra-ui/react';

import 'react-tabs/style/react-tabs.css';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { LanguageTools } from '../../utils/languageTools';

import { Search2Icon } from '@chakra-ui/icons';
import Mfa from 'components/Mfa';
import { api } from '../../utils/network';
import queryString from 'query-string';
import { toast, ToastContainer } from 'react-toastify';
import { separateDigitNumber } from '../../helper';
import { kycGuide } from '../../guides';
import { useHistory } from 'react-router-dom';

const params = queryString.parse(location.search);

const wallet = {
  qr: <Qr />,
  address: '15sqoTwnrNDjRwc2J67xg3egcvBpUFRkmX15sqoTwnrNDjRwc2oTwnrNDjRwc2oTwnrNDjRwc2',
  tag: '4984975243',
  cryptoName: 'بیت کویین',
  icon: <BtcIcon />,
  network: 'BEP2',
};
const customStyles = {
  control: base => ({
    ...base,
    height: 42,
    borderRadius: '3px',
    border: 'solid 1px #d7dbdb',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const width = '100%';
    const textAlign = 'right';

    return { ...provided, opacity, transition, width, textAlign };
  },
};

const options = [
  {
    value: 'بیت کوین-bitcoin',
    label: (
      <Box
        display="grid"
        padding="0 6px"
        gridTemplateColumns="repeat(2, 1fr) 15px"
        gridColumnGap="12px"
        alignItems="center"
      >
        <Text fontFamily="yekan" justifySelf="right" fontSize="12px" color="#050f19">
          بیت کوین
        </Text>
        <Text fontFamily="graphikr" fontSize="12px" color="#050f19" justifySelf="left">
          Bitcoin BTC
        </Text>
        <BtcIcon width={15} />
      </Box>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DepositWithdraw() {
  const history = useHistory();
  const language = LanguageTools();
  const [openStepOne, setOpenStepOne] = useState(false);
  const [openStepTwo, setOpenStepTwo] = useState(false);
  const [openStepThree, setOpenStepThree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openPaymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [openUnSuccessfulPaymentModal, setUnSuccessfulPaymentModal] = useState(false);
  const [openPenddingTomanWalletChargedModal, setPenddingTomanWalletChargedModal] = useState(false);
  const [openUnSuccessfulPaymentCardModal, setUnSuccessfulPaymentCardModal] = useState(false);

  const [openMfaModal, setMfaModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [balance, setBalance] = useState<any>([{ net: 0, gross: 0 }]);
  const [shebaNumber, setShebaNumber] = useState<any>([]);

  const [value, setValue] = useState('1');
  const [preDefinedValue, setPreDefinedValue] = useState<string | null>();
  const [createAccount, setCreateAccount] = useState<string | null>();

  const [limits, setLimits] = useState<any>();
  const [continueClicked, setContinueClicked] = useState(false);

  const {
    isOpen: isOpenWithdrawCurrency,
    onOpen: onOpenWithdrawCurrency,
    onClose: onCloseWithdrawCurrency,
  } = useDisclosure();

  const {
    isOpen: isOpenAcceptWithdrawCurrency,
    onOpen: onOpenAcceptWithdrawCurrency,
    onClose: onCloseAcceptWithdrawCurrency,
  } = useDisclosure();

  const {
    isOpen: isOpenWithdrawSecurityCertification,
    onOpen: onOpenWithdrawSecurityCertification,
    onClose: onCloseWithdrawSecurityCertification,
  } = useDisclosure();

  const {
    isOpen: isOpenWithdrawSubmitRequest,
    onOpen: onOpenWithdrawSubmitRequest,
    onClose: onCloseWithdrawSubmitRequest,
  } = useDisclosure();

  const { isOpen: isOpenDepositSheba, onOpen: onOpenDepositSheba, onClose: onCloseDepositSheba } = useDisclosure();
  function continueFiatDeposit() {
    console.log(preDefinedValue);
    setPreDefinedValue(preDefinedValue?.toString().replace(/,/g, ''));
    console.log(preDefinedValue);
    setContinueClicked(!continueClicked);
    setError(null);
    !preDefinedValue && setError('مبلغ وارد نشده است !');

    preDefinedValue &&
      limits &&
      parseInt(preDefinedValue) < limits.minAmount / 10 &&
      setError(` در هر درخواست واریز حداقل مقدار ${separateDigitNumber(limits?.minAmount / 10)} تومان است `);

    preDefinedValue &&
      limits &&
      parseInt(preDefinedValue) > limits.maxAmount / 10 &&
      setError(` در هر درخواست واریز حداکثر مقدار ${separateDigitNumber(limits?.maxAmount / 10)} تومان است `);
  }

  useEffect(() => {
    toast.error(error, {
      position: 'top-right',
    });
    preDefinedValue &&
      !error &&
      // limits.minAmount / 10 < parseInt(preDefinedValue) < limits.maxAmount / 10 &&
      onOpenDepositSheba();
  }, [error, limits, continueClicked]);
  const {
    isOpen: isOpenSuccessPayment,
    onOpen: onOpenSuccessPayment,
    onClose: onCloseSuccessPayment,
  } = useDisclosure();

  const {
    isOpen: isOpenUnSuccessfulPayment,
    onOpen: onOpenUnSuccessfulPayment,
    onClose: onCloseUnSuccessfulPayment,
  } = useDisclosure();

  const {
    isOpen: isOpenPenddingTomanWalletCharged,
    onOpen: onOpenPenddingTomanWalletCharged,
    onClose: onClosePenddingTomanWalletCharged,
  } = useDisclosure();

  const {
    isOpen: isOpenUnSuccessfulPaymentCard,
    onOpen: onOpenUnSuccessfulPaymentCard,
    onClose: onCloseUnSuccessfulPaymentCard,
  } = useDisclosure();

  const { isOpen: isOpenWithdrawToman, onOpen: onOpenWithdrawToman, onClose: onCloseWithdrawToman } = useDisclosure();

  // const { isOpen: isOpenMfaModal, onOpen: onOpenMfaModal, onClose: onCloseMfaModal } = useDisclosure();
  const { isOpen: isOpenMfaModal, onClose: onCloseMfaModal } = useDisclosure();

  const [options2, setOptions2] = useState<Array<object>>([]);

  useEffect(() => {
    api
      .put(GetURL('warehouse-create-account'), {
        network: 'Shetab',
        asset: 'IRR',
        broker: 'Rabex',
        accountType: 'User',
      })
      .then((response: any) => {
        setCreateAccount(response.UUID);
        api.get(GetURL('warehouse-balance')).then((response: any) => setBalance(response.balance));
      });

    api.post(GetURL('bank-card')).then(response => setCards(response.data));

    api
      .post(GetURL('warehouse-limit'), {
        network: 'Shetab',
        asset: 'IRR',
        type: 'Deposit',
      })
      .then(response => setLimits(response));

    api.get(GetURL('user-sheba-number')).then((response: any) => {
      const data = response.data.map(value => ({
        value: value.iban,
        label: (
          <Flex alignItems="center">
            <Text fontFamily="yekan">{value.bank_name}</Text>
            <Spacer />
            <Text color="#050f19" fontSize="14px" paddingTop="2px" display="flex" justifyContent="flex-end">
              IR {value.iban}
            </Text>
            <Box marginLeft="5px" height="15px">
              <BankPasargadIcon width="15" height="15" />
            </Box>
          </Flex>
        ),
      }));
      setOptions2(data);
    });
  }, []);

  useEffect(() => {
    if (openStepOne) {
      onCloseWithdrawCurrency();
      onOpenAcceptWithdrawCurrency();
      setOpenStepOne(false);
    }
    if (openStepTwo) {
      onCloseAcceptWithdrawCurrency();
      onOpenWithdrawSecurityCertification();
      setOpenStepTwo(false);
    }
    if (openStepThree) {
      onCloseWithdrawSecurityCertification();
      onOpenWithdrawSubmitRequest();
      setOpenStepThree(false);
    }

    if (openPaymentSuccessModal) {
      onCloseDepositSheba();
      onOpenSuccessPayment();
      setPaymentSuccessModal(false);
    }

    if (openUnSuccessfulPaymentModal) {
      onCloseDepositSheba();
      onOpenUnSuccessfulPayment();
      setUnSuccessfulPaymentModal(false);
    }

    if (openPenddingTomanWalletChargedModal) {
      onCloseDepositSheba();
      onOpenPenddingTomanWalletCharged();
      setPenddingTomanWalletChargedModal(false);
    }

    if (openUnSuccessfulPaymentCardModal) {
      onCloseDepositSheba();
      onOpenUnSuccessfulPaymentCard();
      setUnSuccessfulPaymentCardModal(false);
    }

    if (openMfaModal) {
      // onCloseWithdrawToman();
      // onOpenMfaModal();
      // setMfaModal(false);

      //clear
      onOpenWithdrawSubmitRequest();
      WithdrawSubmitRequest();
    }
  }, [
    openStepOne,
    openStepTwo,
    openStepThree,
    openPaymentSuccessModal,
    openMfaModal,
    openUnSuccessfulPaymentModal,
    openPenddingTomanWalletChargedModal,
    openUnSuccessfulPaymentCardModal,
  ]);
  const onChangeFiatDepositAmount = (e: any): void => {
    // var num = e.target.value.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,');
    setPreDefinedValue(e.target.value);
  };

  const WithdrawSubmitRequest = () => {
    api
      .post(GetURL('warehouse-withdraw-request'), {
        amount: preDefinedValue,
        asset: 'IRR',
        iban: shebaNumber,
        from: createAccount,
      })

      .then((res: any) => {});
  };

  const Comma = value => {
    return value
      ?.toString()
      .replaceAll(',', '')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const onConfirmDeposit = () => {
    api
      .post(GetURL('warehouse-deposit-request'), {
        amount: preDefinedValue && (parseInt(preDefinedValue) * 10).toString(),
        asset: 'IRR',

        to: createAccount,
      })

      .then((res: any) => {
        window.location.href = res?.payUrl;
      });
  };
  useEffect(() => {
    // if user cancel payment
    setUnSuccessfulPaymentModal(params.payment_status === 'FAILED');
    !_.isEmpty(params) &&
      api
        .post(GetURL('fiat-deposit-callback'), {
          paymentStatus: params.payment_status,
          token: params.token,
        })
        .then((response: any) => {
          if (response) {
            setUnSuccessfulPaymentCardModal(response?.depositDeliveryStatus === 'UnVerified');
            setPaymentSuccessModal(response?.depositDeliveryStatus === 'SuccessFinished');
            setPenddingTomanWalletChargedModal(response?.depositDeliveryStatus === 'SuccessWait');
          }
        });
  }, [params]);

  function onCloseUnsuccessfulPayment() {
    setUnSuccessfulPaymentModal(false);
    onCloseUnSuccessfulPayment();
  }
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  return (
    <>
      <Drawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} title="راهنما">
        <DataPanel data={kycGuide} />
      </Drawer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box
        w={{ base: '100%', md: '1120px', xl: '1120px' }}
        dir={language.Dir}
        margin="0 auto"
        padding="16px"
        className={language.Align}
        background={'#fff'}
        borderRadius={'12px'}
      >
        <Tabs isLazy>
          <CustomTabList
            padding={{
              base: '0px var(--chakra-space-4)',
              md: '0 40px',
            }}
          >
            <CustomTab
              margin={{ base: '0 0 0 15px', sm: '0 0 0 20px' }}
              _selected={{
                color: '#59636e',
                borderColor: '#d6d9dc',
              }}
            >
              <Text fontSize={{ base: '13px', md: '16px', lg: '16px' }} fontWeight={900}>
                {<FormattedMessage {...messages.deposit} />}
              </Text>
            </CustomTab>
            <CustomTab
              margin={{ base: '0 0 0 15px', sm: '0 0 0 30px' }}
              _selected={{
                color: '#59636e',
                borderColor: '#d6d9dc',
              }}
            >
              <Text fontSize={{ base: '13px', md: '16px', lg: '16px' }} fontWeight={900}>
                {<FormattedMessage {...messages.withdraw} />}
              </Text>
            </CustomTab>
            <Spacer />
            <Flex
              onClick={() => {
                setIsOpenDrawer(true);
              }}
              justifyContent={'center'}
              alignItems="center"
              cursor={'pointer'}
              borderRadius={'20px'}
              width={'85px'}
              height={'37px'}
              background={'#f3f5f8'}
            >
              <Help height="15" width="15" />
              <Text paddingRight={'6px'} fontSize={'12px'} color={'#59636e'}>
                راهنما
              </Text>
            </Flex>
          </CustomTabList>
          <Flex margin={'0 40px'} borderBottom={'1px solid #f3f5f7'} />

          <TabPanels background="#f4f6fa" minHeight="600px">
            <TabPanel padding="0">
              <Tabs isLazy>
                <Box marginTop={'16px'} padding={{ base: '0', xl: '0 40px' }} background={'#fff'}>
                  <CustomTabList
                    height={{
                      base: '62px',
                      md: '62px',
                    }}
                    background="#f3f5f7"
                    borderRadius={{ base: '12px', xl: '32px 12px  12px 32px' }}
                    padding={{ sm: '8px 60px 8px 8px', xl: '8px' }}
                  >
                    <CustomTab
                      width={{ base: '45%', xl: '85px' }}
                      height={{ base: '46px' }}
                      borderRadius="12px"
                      _selected={{
                        color: '#0052ff',
                        borderColor: 'transparent',
                        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1)',
                        background: '#fff',
                        height: '46px',
                        borderRadius: '12px',
                        padding: '0',
                        // marginRight: '8px',
                        marginBottom: '0',
                      }}
                    >
                      <Text fontSize={{ base: '13px', md: '14px', lg: '14px' }} fontWeight={100}>
                        {<FormattedMessage {...messages.toman} />}
                      </Text>
                    </CustomTab>
                    <CustomTab
                      width={{ base: '45%', xl: '85px' }}
                      height={{ base: '46px' }}
                      borderRadius="12px"
                      _selected={{
                        color: '#0052ff',
                        borderColor: 'transparent',
                        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1)',
                        background: '#fff',
                        height: '46px',
                        borderRadius: '12px',
                        padding: '0',
                        // marginRight: '8px',
                        marginBottom: '0',
                      }}
                    >
                      <Text fontSize={{ base: '13px', md: '14px', lg: '14px' }} fontWeight={100}>
                        {<FormattedMessage {...messages.digitalCurrency} />}
                      </Text>
                    </CustomTab>
                    <Spacer display={{ base: 'none', md: 'block' }} />
                    <Box
                      marginLeft={'16px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      maxWidth="36px"
                      minWidth={'36px'}
                      height="36px"
                      boxShadow={'0 0 20px 0 #d6dade'}
                      backgroundColor={'#fff'}
                      borderRadius={'50%'}
                      transition={'max-width 0.5s'}
                      display={{ base: 'none', md: 'inline-flex' }}
                      _hover={{ paddingRight: '6px', maxWidth: '135px', borderRadius: '20px' }}
                      role="group"
                      overflow="hidden"
                    >
                      <ClockIcon />
                      <Text
                        color="#7e8b9a"
                        fontSize={'12px'}
                        paddingRight={'4px'}
                        paddingTop={'2px'}
                        overflow="hidden"
                        whiteSpace={'nowrap'}
                        display={'none'}
                        _groupHover={{
                          transition: 'width 0.5s',
                          maxWidth: '135px',
                          display: 'block',
                          padding: '2px 5px 0 5px',
                        }}
                      >
                        تاریخچه برداشت ها
                      </Text>
                    </Box>
                  </CustomTabList>
                </Box>

                <TabPanels position="relative" background="#fff" minHeight="600px">
                  <CustomTabPanel>
                    <Stack>
                      <Paper
                        styles={{
                          gridRowGap: '24px',
                          gridArea: 'form',
                        }}
                      >
                        <Box w={{ base: '100%', md: '480px', xl: '480px' }} minHeight="326px">
                          <Text
                            display={{ base: 'none', lg: 'block' }}
                            color="#050f19"
                            marginBottom="20px"
                            fontSize="16px"
                            marginTop="10px"
                          >
                            ۱. مطالعه شرایط واریز
                          </Text>

                          <Paper
                            width={{ base: '100%', md: '480px', xl: '480px' }}
                            styles={{
                              gridArea: 'hint',
                            }}
                          >
                            <Hint>
                              <Text
                                color="#050f19"
                                fontSize={{ base: '10px', md: '12px', lg: '14px' }}
                                fontWeight={100}
                              >
                                خرید تنها با کارت‌های ثبت شده و تایید شده در سیستم امکان پذیر است
                              </Text>

                              <Text
                                color="#050f19"
                                fontSize={{ base: '10px', md: '12px', lg: '14px' }}
                                fontWeight={100}
                              >
                                در صورت خرید با کارت‌هایی که یا در سیستم ثبت نیست و یا به نام شما نیست، مبلغ به طور
                                خودکار به حساب بانکی شما برگشت داده میشود
                              </Text>

                              <Text
                                color="#050f19"
                                fontSize={{ base: '10px', md: '12px', lg: '14px' }}
                                fontWeight={100}
                              >
                                خرید تنها با کارت‌های ثبت شده و تایید شده در سیستم امکان پذیر است در صورت خرید با
                                کارت‌هایی که یا در سیستم ثبت نیست و یا به نام شما نیست، مبلغ به طور خودکار
                              </Text>
                            </Hint>
                          </Paper>
                        </Box>
                      </Paper>
                      <Box maxWidth={{ base: '100%', xl: '480px' }}>
                        <Text
                          display={{ base: 'none', lg: 'block' }}
                          color="#050f19"
                          marginBottom="20px"
                          fontSize="16px"
                        >
                          ۲. جزییات واریز
                        </Text>
                        <Paper
                          elevation={1}
                          gridRowGap="14px"
                          styles={{
                            boxShadow: '0 0 6px 0 rgba(22, 82, 240, 0.2)',
                            padding: '20px',
                            gridArea: 'box',
                          }}
                        >
                          <Text
                            paddingRight={'8px'}
                            fontFamily={'yekan'}
                            color="#708599"
                            fontSize={{ base: '13px', xl: '14px' }}
                          >
                            مقدار واریز
                          </Text>
                          <CustomInputText
                            style={{ fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}
                            type="text"
                            onChange={onChangeFiatDepositAmount}
                            onClose={() => setPreDefinedValue('')}
                            value={Comma(preDefinedValue) || ''}
                            endAdornment="تومان"
                            placeholder="مقدار موردنظر برای واریز را وارد کنید"
                          />
                          <Flex marginTop={'12px'} paddingRight={'8px'} justifyContent="space-between" width="55%">
                            <Text w="100px" color="#708599" fontFamily="yekan" fontSize={{ xl: '14px', base: '13px' }}>
                              دارایی کل:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', xl: '14px' }}>
                              {(balance && separateDigitNumber(balance[0].gross / 10)) || '-'}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', xl: '12px' }}>
                              تومان
                            </Text>
                          </Flex>
                          <Flex paddingRight={'8px'} justifyContent="space-between" width="55%">
                            <Text w="100px" color="#708599" fontFamily="yekan" fontSize={{ xl: '14px', base: '13px' }}>
                              دارایی در دسترس:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', xl: '14px' }}>
                              {(balance && separateDigitNumber(balance[0].net / 10)) || '-'}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', xl: '12px' }}>
                              تومان
                            </Text>
                          </Flex>

                          <Flex paddingRight={'8px'} justifyContent="space-between" width="55%">
                            <Text w="100px" color="#708599" fontFamily="yekan" fontSize={{ xl: '14px', base: '13px' }}>
                              حداقل واریز:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', xl: '14px' }}>
                              {(limits && separateDigitNumber(limits.minAmount / 10)) || '-'}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', xl: '12px' }}>
                              تومان
                            </Text>
                          </Flex>
                          <Flex paddingRight={'8px'} justifyContent="space-between" width="55%">
                            <Text w="100px" color="#708599" fontFamily="yekan" fontSize={{ xl: '14px', base: '13px' }}>
                              حداکثر واریز:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', xl: '14px' }}>
                              {(limits && separateDigitNumber(limits.maxAmount / 10)) || '-'}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', xl: '12px' }}>
                              تومان
                            </Text>
                          </Flex>

                          <Button
                            borderRadius="3px"
                            marginTop="12px"
                            height="55px"
                            color="#fff"
                            fontSize="16px"
                            background="#1652f0"
                            padding="25px 0"
                            onClick={continueFiatDeposit}
                            _hover={{
                              background: '#1652f0',
                            }}
                            _focus={{
                              background: '#1652f0',
                            }}
                            _after={{
                              background: '#1652f0',
                            }}
                            _active={{
                              background: '#1652f0',
                            }}
                          >
                            ادامه
                          </Button>
                        </Paper>
                      </Box>
                    </Stack>
                  </CustomTabPanel>
                  <CustomTabPanel>
                    <Stack>
                      <Paper
                        styles={{
                          gridArea: 'form',
                          gridRowGap: '24px',
                        }}
                      >
                        <Box w={{ base: 'calc(100% - 16px)', md: '80%' }}>
                          <Typography
                            variant="caption"
                            styles={{
                              marginBottom: '10px',
                            }}
                          >
                            رمزارز مورد نظر خود را انتخاب کنید
                          </Typography>

                          <Select
                            placeholder={
                              <Box
                                display="grid"
                                gridColumnGap="6px"
                                alignItems="center"
                                gridTemplateColumns="10px 1fr"
                              >
                                <Search2Icon color="#708599" width="100%" transform="scaleX(-1)" />
                                <Typography variant="caption">جست و جو</Typography>
                              </Box>
                            }
                            styles={customStyles}
                            options={options}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </Box>

                        <Box display="grid" gridRowGap="10px">
                          <Box display="flex" alignItems="center">
                            <Typography color="gray">دارایی کل:</Typography>
                            <Typography>-</Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Typography color="gray">دارایی در دسترس:</Typography>
                            <Typography>-</Typography>
                          </Box>
                        </Box>
                      </Paper>
                      <Paper
                        styles={{
                          gridArea: 'hint',
                        }}
                      >
                        <Hint>
                          <Typography>به هنگام ارسال ارز، به شبکه انتقال دقت کنید</Typography>
                          <Typography>
                            در صورت ارسال ارز به کیف پول خود، ایمیل و پیامکی که برای شما ارسال می‌شود یا کیف پول خود را
                            چک کنید.
                          </Typography>
                          <Typography>
                            ارزهای ارسالی به شما پس از گرفتن یک <span>(۱) تاییدیه شبکه</span> به کیف پول شما خواهد نشست.
                          </Typography>
                          <Typography>
                            تا زمانی که تراکنش شما حداقل <span>(۲) تاییدیه شبکه</span> دریافت نکند، به اندازه ارزی که به
                            کیف پول شما اضافه شده است امکان برداشت نخواهید مداشت.
                          </Typography>
                        </Hint>
                        <Links
                          title="برو به تبدیل:"
                          items={[
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                          ]}
                        />
                      </Paper>
                      <Paper
                        elevation={1}
                        styles={{
                          gridArea: 'box',
                        }}
                      >
                        <Box display="grid" gridTemplateColumns="15px 1fr" gridColumnGap="8px" alignItems="center">
                          <InfoCircleIcon />
                          <Typography color="gray">شبکه انتقال</Typography>
                        </Box>
                        <Tabs isLazy>
                          <TabList display="flex" gridColumnGap={{ base: '21px', md: '46px' }}>
                            <Tab
                              fontSize={{ base: '12px', md: '18px' }}
                              color="#708599"
                              fontFamily="graphik"
                              borderBottom="2px solid var(--chakra-colors-gray-200)"
                              _selected={{
                                color: '#050f19',
                                borderBottomColor: '#1652f0',
                              }}
                              padding="9px 0"
                            >
                              BTC
                            </Tab>
                            <Tab
                              fontSize={{ base: '12px', md: '18px' }}
                              color="#708599"
                              fontFamily="graphik"
                              borderBottom="2px solid var(--chakra-colors-gray-200)"
                              _selected={{
                                color: '#050f19',
                                borderBottomColor: '#1652f0',
                              }}
                              padding="9px 0"
                            >
                              BEP2
                            </Tab>
                          </TabList>
                          <TabPanels>
                            {/* initially mounted */}
                            <TabPanel padding="0">
                              <Wallet
                                qr={wallet.qr}
                                address={wallet.address}
                                cryptoName={wallet.cryptoName}
                                icon={wallet.icon}
                                tag={wallet.tag}
                                network={wallet.network}
                              />
                            </TabPanel>
                            {/* initially not mounted */}
                            <TabPanel>
                              <p>two!</p>
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </Paper>
                    </Stack>
                  </CustomTabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>

            <TabPanel padding="0">
              <Tabs isLazy>
                <Box marginTop={'16px'} padding={{ base: '0', xl: '0 40px' }} background={'#fff'}>
                  <CustomTabList
                    height={{
                      base: '62px',
                      md: '62px',
                    }}
                    background="#f3f5f7"
                    borderRadius={{ base: '12px', xl: '32px 12px  12px 32px' }}
                    padding={{ sm: '8px 60px 8px 8px', xl: '8px' }}
                  >
                    <CustomTab
                      width={{ base: '45%', xl: '85px' }}
                      height={{ base: '46px' }}
                      borderRadius="12px"
                      _selected={{
                        color: '#0052ff',
                        borderColor: 'transparent',
                        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1)',
                        background: '#fff',
                        height: '46px',
                        borderRadius: '12px',
                        padding: '0',
                        marginBottom: '0',
                      }}
                    >
                      <Text fontSize={{ base: '13px', md: '14px', lg: '14px' }} fontWeight={100}>
                        {<FormattedMessage {...messages.toman} />}
                      </Text>
                    </CustomTab>
                    <CustomTab
                      width={{ base: '45%', xl: '85px' }}
                      height={{ base: '46px' }}
                      borderRadius="12px"
                      _selected={{
                        color: '#0052ff',
                        borderColor: 'transparent',
                        boxShadow: '0 0 15px 0 rgba(0, 82, 255, 0.1)',
                        background: '#fff',
                        height: '46px',
                        borderRadius: '12px',
                        padding: '0',
                        marginBottom: '0',
                      }}
                    >
                      <Text fontSize={{ base: '13px', md: '14px', lg: '14px' }} fontWeight={100}>
                        {<FormattedMessage {...messages.digitalCurrency} />}
                      </Text>
                    </CustomTab>

                    <Spacer display={{ base: 'none', md: 'block' }} />
                    <Box
                      marginLeft={'16px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      maxWidth="36px"
                      minWidth={'36px'}
                      height="36px"
                      boxShadow={'0 0 20px 0 #d6dade'}
                      backgroundColor={'#fff'}
                      borderRadius={'50%'}
                      transition={'max-width 0.5s'}
                      display={{ base: 'none', md: 'inline-flex' }}
                      _hover={{ paddingRight: '6px', maxWidth: '135px', borderRadius: '20px' }}
                      role="group"
                      overflow="hidden"
                    >
                      <ClockIcon />
                      <Text
                        color="#7e8b9a"
                        fontSize={'12px'}
                        paddingRight={'4px'}
                        paddingTop={'2px'}
                        overflow="hidden"
                        whiteSpace={'nowrap'}
                        display={'none'}
                        _groupHover={{
                          transition: 'width 0.5s',
                          maxWidth: '135px',
                          display: 'block',
                          padding: '2px 5px 0 5px',
                        }}
                      >
                        تاریخچه برداشت ها
                      </Text>
                    </Box>
                  </CustomTabList>
                </Box>

                <TabPanels position="relative" background="#f4f6fa" minHeight="600px">
                  <CustomTabPanel>
                    <Stack
                      gridTemplateAreas={{
                        base: "'form' 'box' 'hint' ",
                        lg: "'form box''hint box'",
                      }}
                    >
                      <Paper
                        styles={{
                          gridArea: 'form',
                          gridRowGap: '18px',
                        }}
                      >
                        <Text fontSize="14px" display={{ base: 'none', md: 'block' }} color="#050f19">
                          {<FormattedMessage {...messages.SelectDestinationAccount} />}
                        </Text>

                        <Box w={{ base: 'calc(100% - 16px)', md: '300px' }}>
                          <Text
                            marginBottom="8px"
                            fontFamily="yekan"
                            marginRight="12px"
                            fontSize={{ base: '13px', md: '14px' }}
                            color="#708599"
                          >
                            <FormattedMessage {...messages.ShebaDestination} />
                          </Text>

                          <Select
                            placeholder={
                              <Box
                                display="grid"
                                gridColumnGap="6px"
                                alignItems="center"
                                gridTemplateColumns="10px 1fr"
                              >
                                <Search2Icon color="#708599" width="100%" transform="scaleX(-1)" />
                                <Typography variant="caption">جست و جو</Typography>
                              </Box>
                            }
                            styles={customStyles}
                            options={options2}
                            onChange={e => setShebaNumber(e.value)}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </Box>
                      </Paper>
                      <Paper
                        width={{ base: '100%', lg: '480px' }}
                        styles={{
                          gridArea: 'hint',
                        }}
                      >
                        <Hint>
                          <Text color="#050f19" fontSize={{ base: '12px', md: '14px' }}>
                            برداشت تنها به شماره شباهای متعلق به شما و ثبت شده در سیستم امکان پذیر است تسویه‌های ریالی
                            همگام با سیکل‌های بانک مرکزی انجام می‌شود
                          </Text>
                          <Link>مشاهده زمان‌بندی پرداخت‌های ریالی</Link>
                        </Hint>
                      </Paper>
                      <Box margin="0 !important" display="grid" gridRowGap="20px" alignItems="start" gridArea="box">
                        <Text display={{ base: 'none', lg: 'block' }} color="#050f19" fontSize="14px">
                          2. جزییات برداشت
                        </Text>

                        <Box padding="20px 30px 21px 43px" background="rgba(255,0,0,0.1)" borderRadius="3px">
                          <RedAlert />
                          <Text marginTop="22px" color="#dc2b2b" fontSize={{ xl: '16px' }}>
                            غیرفعال شدن برداشت‌های تومانی
                          </Text>
                          <Text marginTop="6px" color="#050f19" fontFamily="yekan" fontSize={{ xl: '14px' }}>
                            امکان برداشت تومانی از کیف پول به طور موقت تا۲۴ ساعت
                          </Text>
                        </Box>

                        <Paper width={{ base: '100%', lg: '480px' }} elevation={1}>
                          <Text marginRight={'15px'} color="#708599" fontFamily="yekan">
                            مقدار تسویه
                          </Text>

                          <Box height="50px" marginBottom="10px">
                            <CustomInputText
                              style={{ textAlign: 'center' }}
                              startAdornment="حداکثر"
                              type="text"
                              onChange={onChangeFiatDepositAmount}
                              onClose={() => setPreDefinedValue('')}
                              value={Comma(preDefinedValue) || ''}
                              endAdornment="تومان"
                              placeholder="مقدار موردنظر برای برداشت را وارد کنید"
                            />
                          </Box>
                          <Box marginRight={'15px'} display="flex" alignItems="center" gridColumnGap="6px">
                            <Text
                              w={{ md: '140px', base: '100px' }}
                              fontFamily="yekan"
                              fontSize={{ base: '13px', md: '14px' }}
                              color="#708599"
                            >
                              دارایی کل:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', md: '14px' }}>
                              {Comma(2000000)}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', md: '12px' }}>
                              تومان
                            </Text>
                          </Box>
                          <Box marginRight={'15px'} display="flex" alignItems="center" gridColumnGap="6px">
                            <Text
                              w={{ md: '140px', base: '100px' }}
                              fontFamily="yekan"
                              fontSize={{ base: '13px', md: '14px' }}
                              color="#708599"
                            >
                              دارایی قابل برداشت:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', md: '14px' }}>
                              {Comma(2000000)}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', md: '12px' }}>
                              تومان
                            </Text>
                          </Box>

                          <Box marginRight={'15px'} display="flex" alignItems="center" gridColumnGap="6px">
                            <Text
                              w={{ md: '140px', base: '100px' }}
                              fontFamily="yekan"
                              fontSize={{ base: '13px', md: '14px' }}
                              color="#708599"
                            >
                              حداقل برداشت:
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '13px', md: '14px' }}>
                              {Comma(2000000)}
                            </Text>
                            <Text color="#050f19" fontSize={{ base: '10px', md: '12px' }}>
                              تومان
                            </Text>
                          </Box>

                          <Box marginRight={'15px'} display="flex" alignItems="center" gridColumnGap="6px">
                            <Text
                              w={{ md: '140px', base: '100px' }}
                              fontFamily="yekan"
                              fontSize={{ base: '13px', md: '14px' }}
                              color="#708599"
                            >
                              برداشت روزانه شما:
                            </Text>
                            <Text fontFamily="yekan" fontSize={{ base: '13px', md: '14px' }} color="#050f19">
                              {Comma(1000000)}
                            </Text>
                            <Text fontSize={{ base: '13px', md: '14px' }} color="#050f19">
                              از
                            </Text>
                            <Text fontSize={{ base: '13px', md: '14px' }} color="#050f19">
                              {Comma(20000000)}
                            </Text>
                            <Text fontSize={{ base: '10px', md: '12px' }} color="#050f19">
                              تومان
                            </Text>
                          </Box>

                          <Button
                            borderRadius="2px"
                            height="3.5rem"
                            marginTop="15px"
                            width="100%"
                            fontSize={{ base: '13px', md: '16px' }}
                            color="#fff"
                            onClick={onOpenWithdrawToman}
                            background="#1652f0"
                            _hover={{
                              background: '#1652f0',
                            }}
                            _active={{
                              background: '#1652f0',
                            }}
                          >
                            درخواست برداشت
                          </Button>
                        </Paper>
                      </Box>
                    </Stack>
                  </CustomTabPanel>
                  <CustomTabPanel>
                    <Stack>
                      <Paper
                        styles={{
                          gridArea: 'form',
                          gridRowGap: '24px',
                        }}
                      >
                        <Text fontSize={{ xl: '14px' }} color="#050f19">
                          {<FormattedMessage {...messages.SelectCurrency} />}
                        </Text>

                        <Box w={{ base: 'calc(100% - 16px)', md: '80%' }}>
                          <Text color="#708599" fontSize="12px" marginBottom="10px">
                            {<FormattedMessage {...messages.Currency} />}
                          </Text>
                          <Select
                            placeholder={
                              <Box
                                display="grid"
                                gridColumnGap="6px"
                                alignItems="center"
                                gridTemplateColumns="10px 1fr"
                              >
                                <Search2Icon color="#708599" width="100%" transform="scaleX(-1)" />
                                <Typography variant="caption">جست و جو</Typography>
                              </Box>
                            }
                            styles={customStyles}
                            options={options}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </Box>
                      </Paper>
                      <Paper
                        styles={{
                          gridArea: 'hint',
                        }}
                      >
                        <Hint>
                          <Text color="#050f19" lineHeight="30px" fontSize="14px">
                            انتقال ارزهای دیجیتال برگشت ناپذیر است. از این رو در صورتی که دستور برداشت به آدرس اشتباهی
                            را داشته باشید، این انتقال غیرقابل بازگشت خواهد بود.
                          </Text>
                          <Text color="#050f19" lineHeight="30px" fontSize="14px">
                            هرگونه اشتباه در وارد کردن جزئیات برداشت بر عهده خود کاربر بوده و رابکس مسئولیتی نمی‌پذیرد.{' '}
                          </Text>
                          <Text color="#050f19" lineHeight="30px" fontSize="14px">
                            تعهد رابکس برای انتقال ارز به کیف پول شما بین یک تا ۱۲ ساعت است. در صورت بوجود آمدن مشکلاتی
                            خارج از رابکس برای انتقال رمزارزها، همچون بروزرسانی شبکه، این تعهد از زمان حل شدن مشکل
                            محاسبه خواهد شد.
                          </Text>
                        </Hint>

                        <Links
                          title="برو به تبدیل:"
                          items={[
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                            {
                              text: 'BTC/USDT',
                              url: 'http://127.0.0.1/dashboard/transaction',
                            },
                          ]}
                        />
                      </Paper>
                      <Box margin="0 !important" display="grid" gridRowGap="20px" alignItems="start" gridArea="box">
                        <Text fontSize="14px" color="#050f19">
                          2. جزییات برداشت
                        </Text>
                        <Paper elevation={1}>
                          <Box display="grid" gridRowGap="10px">
                            <Typography variant="caption">آدرس مقصد</Typography>
                            <Input
                              fontFamily="yekan"
                              fontSize="14px"
                              borderRadius="3px"
                              border="1px solid #f4f6fa"
                              textAlign="left"
                              placeholder="آدرس مقصد خود را کپی کنید و در این فضا الصاق کنید"
                              size="lg"
                            />
                          </Box>
                          <Box display="grid" gridRowGap="10px">
                            <Box
                              display="grid"
                              gridColumnGap="8px"
                              alignItems="center"
                              gridTemplateColumns="max-content 15px"
                            >
                              <Typography variant="caption">شبکه انتقال</Typography>
                              <InfoCircleIcon />
                            </Box>
                            <RadioGroup gridRowGap="7px" display="grid" onChange={setValue} value={value}>
                              <CustomCheckbox text={`شبکه بایننس`} endAdornment="BEP2" />
                              <CustomCheckbox text={`شبکه بایننس`} endAdornment="BEP20" />
                            </RadioGroup>
                          </Box>
                          <Box display="grid" gridRowGap="10px">
                            <Box
                              display="grid"
                              gridColumnGap="8px"
                              alignItems="center"
                              gridTemplateColumns="max-content 15px"
                            >
                              <Typography variant="caption">کد تگ</Typography>
                              <InfoCircleIcon />
                            </Box>
                            <Input
                              fontFamily="yekan"
                              fontSize="14px"
                              borderRadius="2px"
                              placeholder="اختیاری"
                              size="lg"
                            />
                          </Box>

                          <Box display="grid" gridRowGap="10px">
                            <Typography variant="caption">مقدار</Typography>
                            <CustomInputText
                              startAdornment="حداکثر"
                              placeholder="مقدار موردنظر برای برداشت را وارد کنید"
                            />
                          </Box>
                          <Box display="flex" gridColumnGap="6px" justifyContent="flex-end">
                            <Typography color="gray">مقدار قابل برداشت:</Typography>
                            <Typography variant="caption" color="dark" lang="en">
                              0.66 BTC
                            </Typography>
                          </Box>
                          <Box display="flex" gridColumnGap="6px">
                            <Typography color="gray">هزینه انتقال:</Typography>
                            <Typography color="dark" lang="en">
                              0.0005 BTC
                            </Typography>
                          </Box>
                          <Box display="flex" gridColumnGap="6px">
                            <Typography color="gray">مقداری که دست شما می رسد:</Typography>
                            <Typography color="dark" lang="en">
                              0.03655 BTC
                            </Typography>
                          </Box>
                          <Button
                            borderRadius="2px"
                            height="3.5rem"
                            marginTop="15px"
                            width="100%"
                            color="#fff"
                            background="#1652f0"
                            onClick={onOpenWithdrawCurrency}
                            _hover={{
                              background: '#1652f0',
                            }}
                          >
                            ادامه
                          </Button>
                        </Paper>
                      </Box>
                    </Stack>
                  </CustomTabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal onClose={onCloseWithdrawCurrency} size="490px" isOpen={isOpenWithdrawCurrency}>
        <ModalOverlay />
        <ModalContent w="490px">
          <ModalCloseButton right="unset" top="24px" left="15px" />
          <ModalBody w="490px" padding="0" dir="rtl">
            <Box>
              <Box padding="24px 17px">
                <Text display="inline-block" fontSize="18px">
                  کد تگ
                </Text>
              </Box>
              <Box>
                <hr />
                <Box padding="0 45px">
                  <Box w="100px" margin="27px auto 0 auto">
                    <InfoModal />
                  </Box>
                  <Text marginTop="28px" textAlign="center" fontSize="18px" color="#050f19">
                    شما کد تگ وتارد نکردید !
                  </Text>
                  <Text marginTop="6px" textAlign="center" color="#050f19" fontSize="16px" fontFamily="yekan">
                    اگر آدرس مقصد کد تگ داشته باشد و شما آن را وارد نکنید، دارایی شما از بین خواهد رفت. آیا اطمینان
                    دارید که آدرس مقصد کد تگ ندارد؟
                  </Text>
                  <Box marginTop="11px" textAlign="center">
                    <Link color="#1652f0" fontSize="16px">
                      کد تگ چیست ؟
                    </Link>
                  </Box>

                  <Flex marginTop="40px" justifyContent="center" marginBottom="28px">
                    <Button
                      w="140px"
                      fontFamily="yekan"
                      height="52px"
                      color="#233a7d"
                      fontSize="16px"
                      borderRadius="3px"
                      background="#f5f7f7"
                      marginLeft="16px"
                    >
                      اصلاح درخواست
                    </Button>

                    <Button
                      w="140px"
                      height="52px"
                      background="#1652f0"
                      color="#fff"
                      fontSize="16px"
                      marginRight="16px"
                      borderRadius="3px"
                      onClick={e => {
                        setOpenStepOne(true);
                      }}
                    >
                      تایید
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseAcceptWithdrawCurrency} size="491px" isOpen={isOpenAcceptWithdrawCurrency}>
        <ModalOverlay />
        <ModalContent w="491px">
          <ModalCloseButton right="unset" top="24px" left="15px" />

          <ModalBody padding="0" width="100%" dir="rtl">
            <Box padding="24px 17px 16px 17px">
              <Text display="inline-block" fontSize="18px">
                تایید تراکش
              </Text>
            </Box>
            <Box>
              <hr />
              <Text fontFamily="yekan" fontSize="20px" textAlign="center" color="#788ca6" marginTop="21px">
                مبلغ دریافتی
              </Text>
              <Text marginTop="5px" textAlign="center" fontSize="32px" color="#050f19" dir="ltr" fontFamily="graphik">
                0.526 BTC
              </Text>
              <Box margin="5px 45px 0 45px" padding="18px 12px" background="#f6f6f8">
                <Flex>
                  <Box width="100%">
                    <Text color="#788ca6" fontSize="16px" fontFamily="yekan">
                      آدرس مقصد
                    </Text>
                  </Box>
                  <Spacer />
                  <Box width="100%">
                    <Text textAlign="left" fontFamily="graphik" color="#050f19" fontSize="16px">
                      addr1q9lenmp9vjmqpxt2z05eerk76vrtldlmw8utq2n6urdr3mdz6aphdvkedv492xwma4kng0l4cqt9nshsmsd9qjnke3wqy3eua8
                    </Text>
                  </Box>
                </Flex>
                <Flex marginTop="12px">
                  <Box width="100%">
                    <Text color="#788ca6" fontSize="16px" fontFamily="yekan">
                      شبکه انتقال
                    </Text>
                  </Box>
                  <Spacer />
                  <Box width="100%">
                    <Text textAlign="left" fontFamily="graphik" color="#050f19" fontSize="16px">
                      BEP20
                    </Text>
                  </Box>
                </Flex>

                <Flex marginTop="12px">
                  <Box width="100%">
                    <Text color="#788ca6" fontSize="16px" fontFamily="yekan">
                      کد تگ
                    </Text>
                  </Box>
                  <Spacer />
                  <Box width="100%">
                    <Text fontFamily="graphik" color="#050f19" fontSize="16px" textAlign="left">
                      467897426
                    </Text>
                  </Box>
                </Flex>

                <Flex marginTop="12px">
                  <Box width="100%">
                    <Text color="#788ca6" fontSize="16px" fontFamily="yekan">
                      هزینه انتقال
                    </Text>
                  </Box>
                  <Spacer />
                  <Box width="100%">
                    <Text fontFamily="graphik" color="#050f19" fontSize="16px" textAlign="left">
                      0.005
                    </Text>
                  </Box>
                </Flex>

                <Flex marginTop="12px">
                  <Box width="100%">
                    <Text color="#788ca6" fontSize="16px" fontFamily="yekan">
                      مقدار برداشت
                    </Text>
                  </Box>
                  <Spacer />
                  <Box width="100%">
                    <Text fontFamily="graphik" color="#050f19" fontSize="16px" dir="ltr" textAlign="left">
                      0.526 BTC
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Box padding="22px 45px 0 45px">
                <Flex>
                  <Box>
                    <InfoSquare />
                  </Box>
                  <Spacer />
                  <Box width="100%">
                    <Text fontFamily="yekan" dir="right" marginRight="10px" textAlign="right">
                      در صورت اشتباه وارد کردن آدرس و کد تگ، تمامی مسئولیت برعهده خود کاربر است و رابکس در این زمینه
                      مسئولیتی نمی‌پذیرد.
                    </Text>
                  </Box>
                </Flex>

                <Button
                  background="#1652f0"
                  color="#fff"
                  marginTop="15px"
                  fontSize="24px"
                  marginBottom="21px"
                  height="50px"
                  borderRadius="4px"
                  width="100%"
                  onClick={e => {
                    setOpenStepTwo(true);
                  }}
                >
                  تایید
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseWithdrawSecurityCertification} size="xl" isOpen={isOpenWithdrawSecurityCertification}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton right="unset" left="15px" />
          <ModalBody padding="0" width="100%" dir="rtl">
            <Box padding="15px">
              <Text display="inline-block" fontSize="18px">
                تایید تراکش
              </Text>
            </Box>
            <Box>
              <hr />
              <Box padding="15px">
                <Mfa
                  task={''}
                  onLoad={response => {
                    setOpenStepThree(true);
                  }}
                />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseWithdrawSubmitRequest} size="sm" isOpen={isOpenWithdrawSubmitRequest}>
        <ModalOverlay />
        <ModalContent w="450px">
          <ModalBody padding="0" width="100%" dir="rtl">
            <Box padding="52px 7px 17px 7px">
              <Box margin="0 auto" w="100px">
                <Accept />
              </Box>
              <Text textAlign="center" marginTop={{ base: '26px', xl: '46px' }} fontSize="20px" color="#050f19">
                درخواست برداشت شما ثبت شد
              </Text>
              <Flex marginTop="8px" alignItems={'center'} justifyContent={'center'}>
                <Text fontFamily="yekan" color="#7e8b9a" textAlign="center" fontSize="12px">
                  شماره سفارش :
                </Text>
                <Text color="#7e8b9a">26745299364</Text>
              </Flex>
              <Text
                padding={'0 20px'}
                marginTop="25px"
                textAlign="center"
                fontFamily="yekan"
                color="#050f19"
                fontSize={{ base: '12px', xl: '14px' }}
              >
                درخواست برداشت تومانی شما ثبت شد. زمانی که پرداخت انجام شود از طریق پیامک اطلاع رسانی خواهد شد.
              </Text>

              <Text
                marginTop={{ base: '21px', xl: '40px' }}
                fontFamily={'yekan'}
                fontSize={{ base: '9px', xl: '12px' }}
                color="#708599"
                padding="7px 25px"
                backgroundColor="#f5f7f7"
                textAlign="center"
              >
                زمان انجام سفارش، همگام با سیکل‌های پایا
              </Text>

              <Flex marginTop="15px" marginRight={'20px'} marginLeft={'20px'} justifyContent="center">
                <Button
                  borderRadius="3px"
                  fontSize={{ base: '14px', xl: '16px' }}
                  w="100%"
                  height={{ base: '46px', xl: '60px' }}
                  color="#fff"
                  background="#1652f0"
                >
                  تاریخچه تراکنش ها
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* deposit-Toman */}
      <Modal onClose={onCloseDepositSheba} size="sm" isOpen={isOpenDepositSheba}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="#d7dbdb" position="absolute" left="19px" right="unset" top="15px" />
          <ModalBody padding="0" width="100%" dir="rtl">
            <Box padding="24px 33px 8px 33px">
              <Text paddingBottom="10px" display="inline-block" fontSize={{ base: '12px', xl: '16px' }}>
                تایید واریز
              </Text>
              <hr />
            </Box>

            <Box padding="0 60px">
              <Box textAlign="center">
                <Flex justifyContent="center" alignItems="center">
                  <Text textAlign="center" color="#050f19" fontSize={{ base: '24px', xl: '30px' }}>
                    {preDefinedValue && separateDigitNumber(preDefinedValue)}
                  </Text>
                  <Text
                    marginLeft="14px"
                    textAlign="center"
                    marginRight="8px"
                    fontFamily={'yekan'}
                    fontSize={{ base: '16px', xl: '18px' }}
                    color="#050f19"
                  >
                    تومان
                  </Text>
                </Flex>

                <Box
                  marginTop={'9px'}
                  display={'flex'}
                  alignItems={'center'}
                  background="#f7f8f9"
                  borderRadius={'3px'}
                  height="32px"
                  textAlign={'center'}
                  justifyContent={'center'}
                >
                  <Text fontSize={{ base: '10px', xl: '13px' }} fontFamily={'yekan'}>
                    کارت های ثبت شده شما :
                  </Text>
                </Box>

                <Box background={'#f7f8f9'} marginTop={'3px'} id="scrollstyle" overflowY="auto" maxHeight={'135px'}>
                  {cards?.map(({ bank_name, card_number, logo }) => {
                    return (
                      <Box
                        height="40px"
                        display="grid"
                        alignItems="center"
                        gridColumnGap="15px"
                        gridTemplateColumns="15px minmax(min-content, max-content) 1fr"
                        padding="0 20px"
                      >
                        <Box justifySelf="center">
                          <Img src={GetStatic(`icons/${logo}`)} />
                        </Box>
                        <Text fontSize={{ base: '9px', xl: '12px' }} fontFamily={'yekan'}>
                          {(bank_name as string).split(' ').splice(-1)}
                        </Text>
                        <Text fontSize={{ base: '9px', xl: '13px' }} justifySelf="left">
                          {card_number}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>

                <Box
                  marginTop={'9px'}
                  display={'flex'}
                  alignItems={'center'}
                  background="#f7f8f9"
                  borderRadius={'3px'}
                  height="39px"
                  textAlign={'center'}
                  justifyContent={'center'}
                >
                  <Text fontSize={{ base: '9px', xl: '12px' }}>
                    واریز تنها با کارت های نشان داده شده امکان پذیر می باشد
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box marginTop="20px" padding="0 28px">
              <Flex>
                <Box marginTop="5px">
                  <InfoSquare />
                </Box>
                <Spacer />
                <Box width="100%" marginRight="8px">
                  <Text
                    fontFamily="yekan"
                    fontSize={{ base: '8px', xl: '10px' }}
                    color="#050f19"
                    dir="right"
                    textAlign="right"
                  >
                    در صورت خرید با کارت بانکی که به نام شما نیست، شارژ ریالی ناموفق خواهد بود و در صورت کسر مبلغ از
                    حساب شما، وجه به طور خودکار به همان حساب برگشت زده می‌شود
                  </Text>
                </Box>
              </Flex>

              <Button
                borderRadius="3px"
                height={{ base: '46px', xl: '60px' }}
                marginTop="23px"
                width="100%"
                fontSize={{ base: '14px', xl: '24px' }}
                marginBottom="17px"
                color="#fff"
                background="#1652f0"
                _hover={{ background: '#1652f0' }}
                _active={{ background: '#1652f0' }}
                onClick={onConfirmDeposit}
              >
                تایید
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseSuccessPayment} size="lg" isOpen={isOpenSuccessPayment}>
        <ModalOverlay />
        <ModalContent width="370px">
          <ModalBody padding="0" width="370px" dir="rtl">
            <Box textAlign="center" padding="62px 20px 26px 20px">
              <Box margin="0 auto" display="inline-block">
                <PaymentSuccess />
              </Box>
              <Text marginTop="24px" color="#050f19" fontSize="18px" textAlign="center">
                کیف پول تومانی شما شارژ شد
              </Text>
              <Text fontFamily="yekan" color="#7e8b9a" marginTop="2px" textAlign="center" fontSize="12px">
                شماره سفارش : -------------
              </Text>

              <Text marginTop="10px">{` کیف پول تومانی شما به مبلغ  ${separateDigitNumber(
                preDefinedValue || 0,
              )}  تومان شارژ شد. لطفا موجودی خود را چک بفرمایید. `}</Text>
              <Box textAlign="center">
                <Button
                  onClick={onCloseSuccessPayment}
                  margin="71px auto 0 auto"
                  fontSize="16px"
                  color="#050f19"
                  background="#fff"
                  border="1px solid #eceff1"
                  width="100%"
                  height="65px"
                  _hover={{ background: '#fff' }}
                  _active={{ background: '#fff' }}
                >
                  بستن
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onClosePenddingTomanWalletCharged} size="lg" isOpen={isOpenPenddingTomanWalletCharged}>
        <ModalOverlay />
        <ModalContent width="370px">
          <ModalBody padding="0" width="370px" dir="rtl">
            <Box textAlign="center" padding="62px 20px 26px 20px">
              <Box margin="0 auto" display="inline-block">
                <PaymentSuccess />
              </Box>
              <Text marginTop="24px" color="#050f19" fontSize="18px" textAlign="center">
                پرداخت تومانی شما موفق بود.
              </Text>
              <Text fontFamily="yekan" color="#7e8b9a" marginTop="2px" textAlign="center" fontSize="12px">
                شماره سفارش : 26745299364
              </Text>
              <Text textAlign="center" fontFamily="yekan" marginTop="20px">
                پرداخت تومانی شما موفق بود. لطفا منتظر تایید و شارژ کیف پول تومانی خود باشید
              </Text>

              <Box textAlign="center">
                <Button
                  onClick={onClosePenddingTomanWalletCharged}
                  margin="71px auto 0 auto"
                  fontSize="16px"
                  color="#050f19"
                  background="#fff"
                  border="1px solid #eceff1"
                  width="100%"
                  height="65px"
                  _hover={{ background: '#fff' }}
                  _active={{ background: '#fff' }}
                >
                  بستن
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseUnSuccessfulPayment} size="sm" isOpen={isOpenUnSuccessfulPayment}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody minHeight={'485px'} maxHeight={'485px'} padding="0" dir="rtl">
            <Box textAlign="center" padding="48px 20px 26px 20px">
              <Box margin="0 auto" display="inline-block">
                <Reject />
              </Box>
              <Text marginTop="24px" color="#050f19" fontSize="18px" textAlign="center">
                متاسفانه پرداخت شما ناموفق بود
              </Text>
              <Flex marginTop="8px" alignItems={'center'} justifyContent={'center'}>
                <Text fontFamily="yekan" color="#7e8b9a" textAlign="center" fontSize="12px">
                  شماره سفارش :
                </Text>
                <Text color="#7e8b9a">26745299364</Text>
              </Flex>

              <Text textAlign="center" fontFamily="yekan" marginTop="25px">
                در صورتی کسر مبلغ از حساب شما، تا ۷۲ ساعت آینده این مبلغ به طور خودکار از سمت بانک به شما برگشت زده
                خواهد شد.
              </Text>

              <Flex w={'100%'} position={'absolute'} right="0" left={'0'} bottom={'18px'} textAlign="center">
                <Button
                  onClick={() => {
                    onCloseUnsuccessfulPayment;
                    history.push('/dashboard/transaction');
                  }}
                  fontSize="16px"
                  color="#fff"
                  background="#1652f0"
                  height="60px"
                  margin={'0 27px'}
                  width="100%"
                  _hover={{ background: '#1652f0' }}
                  _active={{ background: '#1652f0' }}
                >
                  تاریخچه تراکنش
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseUnSuccessfulPaymentCard} size="sm" isOpen={isOpenUnSuccessfulPaymentCard}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody minHeight={'485px'} maxHeight={'485px'} padding="0" dir="rtl">
            <Box textAlign="center" padding="48px 20px 26px 20px">
              <Box margin="0 auto" display="inline-block">
                <Reject />
              </Box>
              <Text marginTop="24px" color="#050f19" fontSize="18px" textAlign="center">
                متاسفانه پرداخت شما ناموفق بود
              </Text>
              <Flex marginTop="8px" alignItems={'center'} justifyContent={'center'}>
                <Text fontFamily="yekan" color="#7e8b9a" textAlign="center" fontSize="12px">
                  شماره سفارش :
                </Text>
                <Text color="#7e8b9a">26745299364</Text>
              </Flex>
              <Text textAlign="center" fontFamily="yekan" marginTop="25px">
                کارتی که با آن خرید کرده‌اید مورد تایید سیستم نیست. لطفا ابتدا کارت بانکی خود را در سیتسم ثبت کرده و
                منتظر تایید آن بمانید.{' '}
              </Text>

              <Flex w={'100%'} position={'absolute'} right="0" left={'0'} bottom={'18px'} textAlign="center">
                <Button
                  onClick={() => {
                    onCloseUnSuccessfulPaymentCard;
                    history.push('/dashboard/transaction');
                  }}
                  fontSize="16px"
                  color="#fff"
                  background="#1652f0"
                  height="60px"
                  margin={'0 27px'}
                  width="100%"
                  _hover={{ background: '#1652f0' }}
                  _active={{ background: '#1652f0' }}
                >
                  تاریخچه تراکنش
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* end deposit-Toman */}
      <Modal onClose={onCloseWithdrawToman} size="sm" isOpen={isOpenWithdrawToman}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton right="unset" left="15px" top="16px" />
          <ModalBody padding="0" width="100%" dir="rtl">
            <Box padding="18px 20px 10px 0">
              <Text display="inline-block" fontSize={{ base: '12px', xl: '17px' }}>
                تایید برداشت
              </Text>
            </Box>
            <Box borderTop="1px solid #d7dbdb" margin="0 25px 0 25px" />
            <Box padding="17px 31px 0 33px" textAlign="center">
              <Text fontSize={{ base: '24px', xl: '30px' }} display="inline-block" color="#050f19">
                {Comma(preDefinedValue)}
              </Text>
              <Text display="inline-block" color="#050f19" fontSize="18px" marginRight="7px" fontFamily="yekan">
                تومان
              </Text>

              <Box marginTop={'16px'} padding="24px 12px 18px 12px" margin={'0 8px'} background="#f6f6f8">
                <Flex>
                  <Text fontFamily="yekan" fontSize={{ base: '11px', xl: '14px' }} color="#788ca6">
                    بانک مقصد
                  </Text>
                  <Spacer />
                  <Text fontSize={{ base: '121px', xl: '14px' }} color="#050f19">
                    پاسارگاد
                  </Text>
                </Flex>

                <Flex marginTop="20px">
                  <Text fontFamily="yekan" fontSize={{ base: '11px', xl: '14px' }} color="#788ca6">
                    شماره شبا
                  </Text>
                  <Spacer />
                  <Text fontSize={{ base: '12px', xl: '14px' }} color="#050f19">
                    IR 27053000000100324200001
                  </Text>
                </Flex>

                <Flex marginTop="20px">
                  <Text fontFamily="yekan" fontSize="16px" color="#788ca6">
                    مقدار برداشت
                  </Text>
                  <Spacer />
                  <Text display="inline-block" fontSize="16px" color="#050f19" marginLeft="8px">
                    تومان
                  </Text>{' '}
                  <Text display="inline-block" fontSize="16px" color="#050f19">
                    {Comma(preDefinedValue)}
                  </Text>
                </Flex>
              </Box>
              <Flex marginTop="25px" alignItems="start">
                <InfoSquare />
                <Text color="#050f19" fontFamily="yekan" textAlign="right" marginRight="8px" fontSize="12px">
                  پرداخت‌های ریالی همگام با سیکل‌های پایا انجام می‌شود. سیکل‌های پایا در روزهای تعطیل انجام نمی‌شود.
                </Text>
              </Flex>
              <Flex marginTop="18px" alignItems="start">
                <InfoSquare />
                <Text color="#050f19" fontFamily="yekan" textAlign="right" marginRight="8px" fontSize="12px">
                  گاهی اوقات با بوجود آمدن مشکل در سیستم بانکی، ممکن است تسویه‌های ریالی با یک یا چند سیکل تاخیر انجام
                  شود.
                </Text>
              </Flex>
              <Button
                marginTop={{ base: '14px', xl: '24px' }}
                onClick={e => {
                  setMfaModal(true);
                }}
                marginBottom="18px"
                background="#1652f0"
                color="#fff"
                height={{ base: '46px', xl: '60px' }}
                fontSize={{ base: '14px', xl: '16px' }}
                w="100%"
                borderRadius="3px"
              >
                تایید
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onCloseMfaModal} size="lg" isOpen={isOpenMfaModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton right="unset" left="15px" />
          <ModalBody padding="0" width="100%" dir="rtl">
            <Box padding="15px">
              <Text display="inline-block" fontSize="18px">
                تایید تراکش
              </Text>
            </Box>
            <Box margin="0 10px" borderTop="1px solid #d7dbdb" />

            <Mfa
              task={''}
              onLoad={() => {
                onOpenWithdrawSubmitRequest();
                onCloseMfaModal();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DepositWithdraw;
