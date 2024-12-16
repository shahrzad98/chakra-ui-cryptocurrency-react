import P from '../../../../components/P';
import Img from '../../../../components/Img';
import { TabPanel } from 'react-tabs';
import React, { useEffect, useState } from 'react';
import Input from '../../../../components/Input';
import Button from '../../../../components/RabexButton';
import { FormattedMessage } from 'react-intl';
import messages from '../../messages';
import {
  Box,
  Stack,
  Center,
  Divider,
  HStack,
  Text,
  Flex,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { api } from '../../../../utils/network';
import { GetStatic, GetURL } from '../../../../utils/urlMap';
import BankCardNumber from '../../../../components/BankCardNumber';
import ShebaNumber from '../../../../components/ShebaNumber';
import Joi from 'joi';
import { useDispatch } from 'react-redux';
import { setBlur } from 'containers/BlurredModal/actions';
import ChangePasswordModal from 'components/ChangePasswordModal';
import TwoFaGoogleModal from 'components/TwoFaGoogleModal';
import SetPineCodeModal from 'components/SetPineCodeModal';
import TwoFaEmailModal from 'components/TwoFaEmailModal';

import {StepOneAuth} from '../../../../images/icon'

import UploadFile from '../../../../components/UploadFile';

const SecuritySettings = () => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState([]);

  const [isMain, setIsMain] = useState(true);

  const [Step, setStep] = useState(1);
  const [StepDevice, setStepDevice] = useState(false);

  const [show_document_image, setShowDocumentImage] = useState('');
  const [show_selfie_image, setShowSelfieImage] = useState('');
  const [show_id_desc_file, setShowDescFile] = useState('');
  const [Secrets, setSecrets] = useState([]);

  useEffect(() => {
    api
      .get(GetURL('users-profile-info'))
      .then(response => {
        setUserProfile(response?.data);
        if (response.data?.base_info.email == '') {
          document.getElementById('email_btn').disabled = true;
        } else {
          document.getElementById('email_btn').disabled = false;
        }
      })
      .catch(err => {});
    getSecretList();
  }, []);

  const ChangePassword = () => {
    dispatch(
      setBlur(ChangePasswordModal, {
        message: 'ssss',
      }),
    );
  };

  const ChangeGoogleAuth = () => {
    dispatch(
      setBlur(TwoFaGoogleModal, {
        message: 'ssss',
        secrets: Secrets,
      }),
    );
  };

  const ChangePineCode = () => {
    setIsMain(false);
    setStep(2);
  };

  const SetPineCode = () => {
    dispatch(
      setBlur(SetPineCodeModal, {
        message: 'ssss',
      }),
    );
  };

  const getSecretList = () => {
    api
      .get(GetURL('get-secret-list'))
      .then(response => {
        setSecrets(response?.data);
      })
      .catch(error => {
        if (error.data) {
        }
      });
  };

  const [state, setState] = useState('1');

  const handleSizeClick = state => {
    setState(state);
  };

  const emailActiveModal = () => {
    if (!document.getElementById('email_btn').disabled) {
      dispatch(
        setBlur(TwoFaEmailModal, {
          message: 'ssss',
        }),
      );
    }
  };

  const AuthStatus = type => {
    for (let i = 0; i < Secrets.length; i++) {
      if (Secrets[i].channel_type == type) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Stack
        display={isMain ? 'flex' : 'none'}
        marginTop="20px"
        direction={['column', 'row']}
      >
        <Box
          width={{ base: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }}
        >
          <Box padding="20px 15px" boxShadow="md" rounded="sm" bg="white">
            <Text textAlign="right" fontSize="16px">
              {<FormattedMessage {...messages.twofa} />}
            </Text>

            <Box
              width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
              display="inline-block"
              textAlign="right"
              marginTop="36px"
              paddingRight="30px"
              marginBottom="36px"
            >
              <Img
                display="inline"
                height="50px"
                src={require('images/authenticator.svg')}
              />
              <Box display="inline-block" verticalAlign="middle">
                <Text padding="0 20px 0 0" textAlign="right">
                  {<FormattedMessage {...messages.googletwofa} />}
                </Text>
                <Text
                  color="#708599"
                  padding="0 20px 0 0"
                  textAlign="right"
                  fontFamily="yekan"
                >
                  {<FormattedMessage {...messages.walletCode} />}
                </Text>
              </Box>

              {AuthStatus(2) ? (
                <Button
                  float="left"
                  text={<FormattedMessage {...messages.active} />}
                  background="#fff"
                  border="1px solid #1652f0"
                  color="#1652f0"
                  fontFamily="yekan !important"
                  fontWeight="0"
                  fontSize="13px"
                />
              ) : (
                <Button
                  onClick={e => ChangeGoogleAuth()}
                  float="left"
                  text={<FormattedMessage {...messages.Activate} />}
                  background="#fff"
                  border="1px solid #1652f0"
                  color="#1652f0"
                  fontFamily="yekan !important"
                  fontWeight="0"
                  fontSize="13px"
                />
              )}
            </Box>

            <hr />

            <Box
              width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
              display="inline-block"
              textAlign="right"
              marginTop="36px"
              marginBottom="36px"
              paddingRight="30px"
            >
              <Img
                display="inline"
                height="50px"
                src={require('images/mobile2.svg')}
              />
              <Box display="inline-block" verticalAlign="middle">
                <Text padding="0 20px 0 0" textAlign="right">
                  {<FormattedMessage {...messages.Mobile2Fa} />}
                </Text>
                <Text
                  color="#708599"
                  padding="0 20px 0 0"
                  textAlign="right"
                  fontFamily="yekan"
                >
                  {<FormattedMessage {...messages.walletCode} />}
                </Text>
              </Box>
              {AuthStatus(0) ? (
                <Button
                  float="left"
                  text={<FormattedMessage {...messages.active} />}
                  background="#fff"
                  border="1px solid #1652f0"
                  color="#1652f0"
                  fontFamily="yekan !important"
                  fontWeight="0"
                  fontSize="13px"
                />
              ) : (
                <Button
                  float="left"
                  text={<FormattedMessage {...messages.Activate} />}
                  background="#fff"
                  border="1px solid #1652f0"
                  color="#1652f0"
                  fontFamily="yekan !important"
                  fontWeight="0"
                  fontSize="13px"
                />
              )}
            </Box>

            <hr />

            <Box
              width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
              display="inline-block"
              textAlign="right"
              marginTop="36px"
              marginBottom="36px"
              paddingRight="30px"
            >
              <Img
                display="inline"
                height="50px"
                width="40px"
                src={require('images/email.svg')}
              />
              <Box display="inline-block" verticalAlign="middle">
                <Text padding="0 10px 0 0" textAlign="right">
                  {<FormattedMessage {...messages.Email2fa} />}
                </Text>
                <Text
                  fontFamily="yekan"
                  color="#708599"
                  padding="0 10px 0 0"
                  textAlign="right"
                >
                  {<FormattedMessage {...messages.walletCode} />}
                </Text>
              </Box>
              {AuthStatus(1) ? (
                <Button
                  float="left"
                  background="#fff"
                  border="1px solid #1652f0"
                  color="#1652f0"
                  fontFamily="yekan !important"
                  fontWeight="0"
                  fontSize="13px"
                >
                  {<FormattedMessage {...messages.active} />}
                </Button>
              ) : (
                <Button
                  float="left"
                  background="#fff"
                  border="1px solid #1652f0"
                  color="#1652f0"
                  fontFamily="yekan !important"
                  fontWeight="0"
                  id="email_btn"
                  onClick={e => {
                    emailActiveModal();
                  }}
                  fontSize="13px"
                  // {userProfile?.base_info?.email != "" ? disabled  :''}
                >
                  {<FormattedMessage {...messages.Activate} />}
                </Button>
              )}
            </Box>
          </Box>

          <Box
            width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
            display="inline-block"
            textAlign="right"
            marginTop="20px"
            marginBottom="20px"
            padding="18px 15px"
            boxShadow="md"
            rounded="sm"
            bg="white"
          >
            <Box display="inline-block">
              <P
                padding="10px 10px 0 0"
                textAlign="right"
                text="مدیریت دستگاه"
              />
            </Box>

            <Box display="inline-block" float="left">
              <Button
                float="left"
                background="#fff"
                border="1px solid #1652f0"
                color="#1652f0"
                fontFamily="yekan !important"
                fontWeight="0"
                fontSize="13px"
                onClick={e => {
                  setStepDevice(true);
                  setIsMain(false);
                }}
                text="فعال کردن"
              />
            </Box>
          </Box>
        </Box>
        <Box w={{ base: '100%', md: '50%', lg: '50%', xl: '50%' }}>
          <Box
            width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
            display="inline-block"
            textAlign="right"
            padding="20px 15px"
            boxShadow="md"
            rounded="sm"
            bg="white"
          >
            <Box display="inline-block" verticalAlign="middle">
              <Text padding="0 10px 0 0" textAlign="right">
                کلمه عبور
              </Text>
              <Text textAlign="right" fontFamily="yekan" padding="0 10px 0 0">
                تغییر کلمه عبور
              </Text>
            </Box>

            <Button
              onClick={e => {
                ChangePassword();
              }}
              float="left"
              background="#fff"
              border="1px solid #1652f0"
              color="#1652f0"
              fontFamily="yekan !important"
              fontWeight="0"
              fontSize="13px"
            >
              تغییر کلمه عبور
            </Button>

            <Box
              bg="#f5f7f7"
              padding="10px"
              marginTop="25px"
              borderRadius="4px"
            >
              <Img
                height="24px"
                display="inline-block"
                src={require('images/info.svg')}
              />
              <Text
                padding="0 10px 0 0"
                fontFamily="yekan"
                display="inline-block"
              >
                در صورت تغییر کلمه عبور، تا ۴۸ ساعت اجازه برداشت از کیف پول را
                نخواهید داشت.
              </Text>
            </Box>
          </Box>

          <Box
            width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
            display="inline-block"
            textAlign="right"
            padding="26px 15px"
            marginTop="20px"
            boxShadow="md"
            rounded="sm"
            bg="white"
          >
            <Box display="inline-block" verticalAlign="middle">
              <Text padding="0 10px 0 0" textAlign="right">
                پین کد کیف پول
              </Text>
              <Text padding="0 10px 0 0" textAlign="right" fontFamily="yekan">
                این پین کد برای ورود به کیف پول نیاز است
              </Text>
            </Box>

            {userProfile.pin_enabled != null ? (
              <Button
                onClick={e => {
                  ChangePineCode();
                }}
                float="left"
                background="#fff"
                border="1px solid #1652f0"
                color="#1652f0"
                fontFamily="yekan !important"
                fontWeight="0"
                fontSize="13px"
                text="تغییر پین کد"
              />
            ) : (
              <Button
                onClick={e => {
                  SetPineCode();
                }}
                float="left"
                background="#fff"
                border="1px solid #1652f0"
                color="#1652f0"
                fontFamily="yekan !important"
                fontWeight="0"
                fontSize="13px"
                text="تعیین پین کد"
              />
            )}

            <Box
              bg="#f5f7f7"
              padding="10px"
              marginTop="20px"
              borderRadius="4px"
            >
              <Box display="flex">
                <Img
                  height="24px"
                  display="inline-block"
                  src={require('images/info.svg')}
                />

                <Text
                  display="inline-block"
                  padding="0 10px 0 0"
                  fontFamily="yekan"
                >
                  پین کد چهار رقمی ورود به کیف پول، در هیچ فضایی نگهداری نمی‌شود
                  و از هیچ طریقی قابل بازیابی نیست. این پین کد را در جایی امن
                  نگهداری کرده و به هیچ عنوان در اختیار افراد غیر قرار ندهید.
                </Text>
              </Box>

              <Box display="flex">
                <Img
                  height="24px"
                  display="inline-block"
                  src={require('images/info.svg')}
                />

                <Text
                  display="inline-block"
                  padding="0 10px 0 0"
                  fontFamily="yekan"
                >
                  در صورت از دست دادن این پین کد، تغییر پین کد را زده و به طریقی
                  که از شما خواسته می‌شود احراز هویت کنید. بررسی این درخواست تا
                  ۷ روز طول خواهد کشید. پس از تغییر پین کد تا ۴۸ ساعت امکان
                  برداشت از کیف پول وجود نخواهد داشت.
                </Text>
              </Box>
            </Box>
          </Box>

          <Box
            width={{ base: '100%', md: '100%', lg: '100%', xl: '100%' }}
            display="inline-block"
            textAlign="right"
            marginTop="20px"
            marginBottom="20px"
            padding="18px 15px"
            boxShadow="md"
            rounded="sm"
            bg="white"
          >
            <Box display="inline-block" verticalAlign="middle">
              <P
                padding="0 10px 0 0"
                textAlign="right"
                text="مدیریت آدرس های سفید"
              />
            </Box>

            <Button
              float="left"
              background="#fff"
              border="1px solid #1652f0"
              color="#1652f0"
              fontFamily="yekan !important"
              fontWeight="0"
              fontSize="13px"
              text="مدیریت"
            />
          </Box>
        </Box>
      </Stack>

      <Stack
        display={Step != 2 ? 'none' : 'flex'}
        padding="30px 45px"
        marginTop="20px"
        bg="#fff"
        boxShadow="md"
        direction={['column', 'row']}
      >
        <Box w="50%" textAlign="right">
          <Flex>
            <Box>
              <StepOneAuth
                textAlign="right"
                height="80px"
              
              />
              <Text marginTop="25px" fontSize="22px">
                تغییر پین کد کیف پول
              </Text>
              <Text fontFamily="yekan" marginTop="10px">
                در صورتی که پین کد کیف پول خود را فراموش کردید، نیاز است یک
                مرحله احراز هویت انجام داده و یک عکس سلفی همراه با متن دست نوشت
                و کارت شناسایی معتبر برای رابکس ارسال کنید.
              </Text>
              <Text marginTop="10px" fontFamily="yekan">
                بررسی این درخواست تا ۷ روز زمان خواهد برد.
              </Text>
              <Text fontFamily="yekan" marginTop="10px">
                در صورت قابل قبول بودن مدرک ارسالی، پین کد شما ریست شده و مجدد
                می‌توانید پینکدی را انتخاب کنید
              </Text>
            </Box>

            <Center height="50px">
              <Divider
                paddingRight="30px"
                borderLeftWidth="2px"
                position="relative"
                top="176px"
                height="200px"
                orientation="vertical"
              />
            </Center>
          </Flex>
        </Box>

        <Box w="50%" paddingRight="30px" paddingLeft="20px" textAlign="right">
          <Img
            textAlign="right"
            height="80px"
            src={require('images/notepadblue.svg')}
          />
          <Text marginTop="25px" fontSize="22px">
            متن دست نوشت
          </Text>

          <Text fontFamily="yekan" marginTop="10px">
            اینجانب،‌ فلان فلانی به کد ملی فلاننننننن درخواست دارم تا پین کد
            ورود به کیف پول رابکس خود را تغییر دهم.
          </Text>
          <Text marginTop="10px" fontFamily="yekan">
            تاریخ و امضا
          </Text>

          <Text fontSize="22px" marginTop="20px">
            مدرک شناسایی معتبر
          </Text>
          <Text fontFamily="yekan" marginTop="10px">
            کارت ملی جدید، شناسنامه جدید، گواهی نامه، گذرنامه، کارت پایان خدمت
          </Text>

          <Box marginTop="40px" w="100%" textAlign="left">
            <Button
              onClick={e => {
                setStep(3);
              }}
              background="#1652f0"
              color="#fff"
              borderRadius="2px"
              padding="28px 70px"
            >
              تایید و ادامه
            </Button>
          </Box>
        </Box>
      </Stack>

      <Stack
        display={Step != 3 ? 'none' : 'block'}
        padding="30px 45px"
        marginTop="20px"
        bg="#fff"
        boxShadow="md"
        direction={['column', 'row']}
      />

      <Stack
        display={StepDevice && !isMain ? 'block' : 'none'}
        
        marginTop="20px"
      >
        <Box padding="50px 60px" bg="#fff" boxShadow="md">
        <Text fontSize="24px">مدیریت دستگاه ها</Text>
        <Text color="#767676" fontFamily="yekan">
          در حال حاضر این دستگاه‌ها امکان دسترسی به حساب کاربری شما را دارند.
        </Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>دستگاه</Th>
              <Th>تاریخ</Th>
              <Th>موقعیت</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Chrome V89.4.659.1436 (Windows)</Td>
              <Td>۱۳۹۹ - ۰۳ - ۰۱ ۱۲:۳۹:۰۷</Td>
              <Td>ایران - تهران</Td>
            </Tr>
          </Tbody>
        </Table>
        </Box>

        <Box marginTop="30px !important" padding="50px 60px" bg="#fff" boxShadow="md">
        <Text fontSize="24px">تاریخچه ورود</Text>
        <Text color="#767676" fontFamily="yekan">
          تاریخچه ورود دستگاه های مختلف به حساب کاربری شما
        </Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>دستگاه</Th>
              <Th>تاریخ</Th>
              <Th>موقعیت</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Chrome V89.4.659.1436 (Windows)</Td>
              <Td>۱۳۹۹ - ۰۳ - ۰۱ ۱۲:۳۹:۰۷</Td>
              <Td>ایران - تهران</Td>
            </Tr>
          </Tbody>
        </Table>
        </Box>

 
      </Stack>
    </>
  );
};

export default SecuritySettings;
