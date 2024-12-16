import React, { useState, useEffect } from 'react';
import { GetURL } from 'utils/urlMap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { LanguageTools } from 'utils/languageTools';
import Joi from 'joi';
import { api } from 'utils/network';
import { toast } from 'react-toastify';
import TokenManager from 'utils/TokenManager';
import { useHistory, Link } from 'react-router-dom';
import Header from '../Header/header';
import { Box, Checkbox, Flex, Stack, Text, Input, Button } from '@chakra-ui/react';
import styled from 'styled-components';
import PasswordStrengthBar from 'react-password-strength-bar';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    referral: '',
    acceptTerms: false,
  });

  const err = {};
  const history = useHistory();
  const [isReferral, setIsReferral] = useState(false);

  useEffect(() => {
    const ref = history.location.pathname.split('/');
    console.log(ref[3]);
    if (typeof ref[3] !== 'undefined' && ref[3] != '') {
      setIsReferral(true);
      const res = ref[3];
      setForm({ ...form, referral: res });
    }
  }, [setForm, history, setIsReferral, isReferral]);

  const [passwordShown, setPasswordShown] = useState(false);
  const [passMetrShown, setPassMetrShown] = useState('');

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const [passwordStingText, setPasswordStingText] = useState('');
  const [passwordStingColor, setPasswordStingColor] = useState('#cf5b25');

  const [isLoading, setIsLoading] = useState(false);

  const changePasswordStringText = score => {
    switch (score) {
      case 1: {
        setPasswordStingText('ضعیف');
        setPasswordStingColor('#cf5b25');
        break;
      }
      case 2: {
        setPasswordStingText('ضعیف');
        setPasswordStingColor('#cf5b25');
        break;
      }
      case 3: {
        setPasswordStingText('متوسط');
        setPasswordStingColor('#1652f0');
        break;
      }
      case 4: {
        setPasswordStingText('قوی');
        setPasswordStingColor('#25c281');
        break;
      }
      default:
        0;
    }
  };

  const handlePhoneNumber = (evt) => {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
    return false;
  };

  const schema = Joi.object({
    first_name: Joi.string().min(2).label('name').messages({
      'string.empty': 'نام نمی تواند خالی باشد.',
      'string.min': 'نام  شما صحیح نیست.',
    }),
    last_name: Joi.string().min(2).label('last-name').messages({
      'string.empty': 'نام خانوادگی نمی تواند خالی باشد.',
      'string.min': 'نام خانوادگی شما صحیح نیست.',
    }),
    username: Joi.string()
      .regex(/((^([+]|0*)98)|(^0))?[9][0-9]{9}$/)
      .required()
      .label('username')
      .messages({
        'string.empty': 'شماره همراه نمی تواند خالی باشد.',
        'object.regex': 'شماره همراه شما صحیح نیست.',
        'string.pattern.base': 'لطفا شماره همراه معتبر وارد نمایید',
      }),
    password: Joi.string().required().min(7).label('password').messages({
      'string.empty': 'کلمه عبور نمی تواند خالی باشد.',
      'string.min': 'کلمه عبور باید حداقل هفت رقم باشد.',
      'any.required': 'کلمه عبور نمی تواند خالی باشد.',
    }),
    referral: Joi.string().allow('').label('referral'),
    acceptTerms: Joi.boolean().invalid(false).label('acceptTerms').messages({
      'any.invalid': 'لطفا در صورت موافقت با مقررات سایت، تیک پذیرش مقررات را انتخاب نمایید',
    }),
  });

  // @ts-ignore
  const language = new LanguageTools();

  const [errorMessages, setError] = useState('');
  // @ts-ignore
  const validate = () => {
    setIsLoading(true);
    const result = schema.validate(form);
    let _error = '';

    if (result.error) {
      for (const item of result?.error?.details) {
        const path = item?.path.join('_');

        err[path] = item?.message;

        _error += item?.message;
      }
      setError(_error);
      toast.error(_error, {
        position: 'bottom-center',
      });
      setIsLoading(false);
      return result.error;
    }
    setIsLoading(true);
    // @ts-ignore
    api
      .put(GetURL('register'), {
        username: form.username,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
      })
      .then(response => {
        setIsLoading(false);
        TokenManager.set(response.data);
        toast.success(response.data?.error?.message, {
          position: 'top-center',
        });
        history.push('totp/', {
          form,
          tasks: response?.data?.task_list,
          state: {
            historyUrl: 'register',
          },
        });
      })
      .catch(error => {
        setIsLoading(false);
        if (error?.data?.error?.validation_errors?.first_name != 'undefined') {
          setError('نام و نام خانوادگی شما باید به صورت فارسی وارد شود');
        }
        if (error?.data?.error?.validation_errors?.password != 'undefined') {
          setError('تعداد کاراکتر پسورد شما معتبر نیست (پسورد باید بصورت انگلیسی وارد شود)');
        }
        if(error?.data?.error?.code=="-1083")
          setError('این کاربر قبلا ثبت نام کرده');
      });
  };

  const ErrorBox = styled.div`
    padding: 20px 35px;
    background: rgba(255,83,83,0.11);
    border: 1px solid #ff5353;
    color:#ff5353;
    text-align: center;
    font-size:14px;
  `;

  const PaddingLink = styled.div`
    padding: 15px 0;
  `;

  let Error;
  if (errorMessages != '') {
    Error = <ErrorBox>{errorMessages}</ErrorBox>;
  }

  const password = '';
  return (
    <>
      <Box
        padding="0"
        w="100%"
        onKeyDown={e => {
          // depraceated, needs an update
          if (e.charCode == 13 || e.keyCode == 13) {
            validate();
          }
        }}
        textAlign="center"
      >
        <Header />
        <Box
          boxShadow="0 5px 15px -2px rgb(0 0 0 / 20%)"
          borderRadius={{ base: '4px', md: '6px' }}
          margin={{ xl: '102px auto 0 auto', lg: '102px auto 0 auto', base: '30px auto 0 auto' }}
          w={{
            base: '91%',
            md: '60%',
            lg: '40%',
            xl: '480px',
          }}
          background="#fff"
          dir={language.Dir}
          className={language.Align}
        >
          <Text
            textAlign="center"
            paddingTop={{ xl: '32px', base: '25px' }}
            margin={{ base: '0  0 24px 0', lg: '0  0 21px 0' }}
            fontSize={{ base: '20px', xl: '28px' }}
            color="#050F19"
          >
            <FormattedMessage {...messages.registerButton} />
          </Text>

          {Error}

          <Box borderBottom="1px solid #eceff1" />

          <Box
            width={{
              base: '98%',
              sm: '98%',
              md: '98%',
              lg: '98%',
              xl: '98%',
            }}
          >
            <Flex>
              <Box padding={{ xl: '23px 30px 23px 0', base: '18px 27px 18px 0' }} display="flex" alignItems="center" textAlign="right" position="relative">
                <Text width="100px" fontSize={{ base: '14px', xl: '16px' }} color="#050f19">
                  <FormattedMessage {...messages.name} />
                </Text>
              </Box>

              <FormattedMessage {...messages.nameNationalCode}>
                {msg => (
                  <Input
                    className={language.Align}
                    type="text"
                    id="name"
                    fontSize={{ base: '14px', xl: '16px' }}
                    fontFamily="yekan"
                    placeholder={msg}
                    height={{ base: '64px', xl: '76px' }}
                    border="0"
                    width="100%"
                    onChange={event => setForm({ ...form, first_name: event.target.value })}
                  />
                )}
              </FormattedMessage>
            </Flex>
          </Box>

          <Box borderBottom="1px solid #eceff1" />

          <Box
            width={{
              base: '98%',
              sm: '98%',
              md: '98%',
              lg: '98%',
              xl: '98%',
            }}
          >
            <Flex>
              <Box padding={{ xl: '23px 37px 23px 0', base: '18px 27px 18px 0' }} display="flex" alignItems="center" textAlign="right" position="relative">
                <Text width="100px" fontSize={{ base: '14px', xl: '16px' }} color="#050f19">
                  <FormattedMessage {...messages.family} />
                </Text>
              </Box>

              <FormattedMessage {...messages.familyNationalCode}>
                {msg => (
                  <Input
                    dir={language.Dir}
                    className={language.Align}
                    id="last-name"
                    fontFamily="yekan"
                    placeholder={msg}
                    border="0"
                    fontSize={{ base: '14px', xl: '16px' }}
                    height={{ base: '64px', xl: '76px' }}
                    width="100%"
                    type="text"
                    label={<FormattedMessage {...messages.family} />}
                    onChange={event => setForm({ ...form, last_name: event.target.value })}
                  />
                )}
              </FormattedMessage>
            </Flex>
          </Box>

          <Box borderBottom="1px solid #eceff1" />

          <Flex>
            <Box padding={{ xl: '23px 37px 23px 0', base: '18px 27px 18px 0' }} display="flex" alignItems="center" textAlign="right" position="relative">
              <Text width="95px" color="#050f19" fontSize={{ base: '14px', xl: '16px' }} display="inline-block">
                <FormattedMessage {...messages.mobile_label} />
              </Text>
            </Box>
            <FormattedMessage {...messages.mobileno}>
              {msg => (
                <Input
                  type="text"
                  maxLength={11}
                  id="username"
                  padding="0 0 0 30px"
                  width="100%"
                  textAlign="left"
                  fontFamily="yekan"
                  min="0"
                  border="0"
                  fontSize={{ base: '14px', xl: '16px' }}
                  dir="ltr"
                  height={{ base: '64px', xl: '76px' }}
                  placeholder={msg}
                  onKeyPress={(e)=>{
                    handlePhoneNumber(e);
                  }}
                  onChange={e => {
                    setForm({ ...form, username: e.target.value });
                  }}
                />
              )}
            </FormattedMessage>
          </Flex>

          <Box display={isReferral ? 'none' : 'block'} borderBottom="1px solid #eceff1" />

          <Flex display={isReferral ? 'none' : 'flex'}>
            <Box display="flex" alignItems="center" padding={{ xl: '23px 37px 23px 0', base: '18px 27px 18px 0' }} textAlign="right" position="relative">
              <Text width="150px" fontSize={{ base: '14px', xl: '16px' }} color="#050f19" textAlign="right">
                <FormattedMessage {...messages.referral} />
              </Text>
            </Box>
            <FormattedMessage {...messages.referralPlaceholder}>
              {msg => (
                <Input
                  dir="ltr"
                  type="text"
                  id="referral"
                  display={isReferral ? 'none' : 'block'}
                  defaultValue={form.referral}
                  width="100%"
                  padding="0 0 0 30px"
                  fontSize={{ base: '14px', xl: '16px' }}
                  border="0"
                  textAlign="left"
                  fontFamily="yekan"
                  height={{ base: '64px', xl: '76px' }}
                  placeholder={msg}
                  onChange={event => setForm({ ...form, referral: event.target.value })}
                />
              )}
            </FormattedMessage>
          </Flex>

          <Box borderBottom="1px solid #eceff1" />

          <Flex alignItems="center">
            <Box display="flex" alignItems="center" padding={{ xl: '23px 37px 23px 0', base: '18px 27px 18px 0' }} textAlign="right" position="relative">
              <Text width="110px" fontSize={{ base: '14px', xl: '16px' }} textAlign="right" color="#050f19">
                <FormattedMessage {...messages.password} />
              </Text>
            </Box>

            <FormattedMessage {...messages.passwordPlaceholder}>
              {msg => (
                <Input
                  type={passwordShown ? 'text' : 'password'}
                  id="password"
                  width="100%"
                  padding="0 25px 0 0"
                  height={{ base: '64px', xl: '76px' }}
                  fontSize={{ base: '14px', xl: '16px' }}
                  border="0"
                  textAlign="left"
                  dir="ltr"
                  fontFamily="yekan"
                  placeholder={msg}
                  onChange={e => {
                    setPassMetrShown(e.target.value);
                    setForm({ ...form, password: e.target.value });
                  }}
                />
              )}
            </FormattedMessage>

            {passwordShown ? (
              <ViewIcon
                position="relative"
                zIndex="9"
                cursor="pointer"
                color="#A0AEC0"
                marginLeft="19px"
                onClick={togglePasswordVisiblity}
                w={12}
                h={5}
              />
            ) : (
              <ViewOffIcon
                position="relative"
                zIndex="9"
                cursor="pointer"
                color="#A0AEC0"
                marginLeft="19px"
                onClick={togglePasswordVisiblity}
                w={12}
                h={5}
              />
            )}
          </Flex>

          <Box dir="ltr" marginLeft="50px" marginRight="220px" position="relative" top="-20px">
            <Flex alignItems="center">
              {passMetrShown.length > 0 ? (
                <>
                  <PasswordStrengthBar
                    onChangeScore={e => {
                      changePasswordStringText(e);
                    }}
                    style={{ width: '76%' }}
                    barColors={['#708599', '#cf5b25', '#f6b44d', '#1652f0', '#25c281']}
                    shortScoreWord=""
                    scoreWords={['', '', '', '', '']}
                    password={form.password}
                  />
                  <Text fontFamily="yekan" fontSize="11px" color={passwordStingColor} marginLeft="20px">
                    {passwordStingText}
                  </Text>
                </>
              ) : (
                ''
              )}
            </Flex>
          </Box>
          <Box borderBottom="1px solid #eceff1" />

          <Box textAlign="center">
            <Box padding="23px 30px 17px 30px">
              <Checkbox
                onChange={e =>
                  setForm({
                    ...form,
                    acceptTerms: e.target.checked,
                  })
                }
                addon
              >
                <Text fontSize={{ base: '12px', xl: '14px' }} textAlign="right" fontFamily="yekan">
                  {/* {<FormattedMessage {...messages.rule} />} */}
                  <FormattedMessage
                    id="footer.table_no"
                    defaultMessage="تایید میکنم بیش از هجده سال سن دارم و {link} سایت و {policy} را مطالعه کرده و می پذیرم."
                    values={{
                      link: (
                        <a style={{ color: '#1652f0' }} target="_blank" href="https://rabex.ir/terms/">
                          قوانین و مقررات
                        </a>
                      ),
                      policy: (
                        <a style={{ color: '#1652f0' }} target="_blank" href="https://rabex.ir/policy/">
                          سیاست حریم خصوصی
                        </a>
                      ),
                    }}
                  />
                </Text>
              </Checkbox>
            </Box>

            <Box padding="0 30px 0 30px">
              <Button
                bg="#1652f0"
                color="#fff"
                _hover={{ background: '#1652f0' }}
                _active={{ background: '#1652f0' }}
                fontSize={{ xl: '20px', base: '12px' }}
                width="100%"
                height={{base:"55px",xl:"60px"}}
                onClick={validate}
              >
                {isLoading ? (
                  <Box marginTop="8px">
                    <ScaleLoader height={20} color="#fff" />
                  </Box>
                ) : (
                  <Text>
                    <FormattedMessage {...messages.registerButton} />
                  </Text>
                )}
              </Button>
            </Box>

            <Box padding="16px 0">
              <Text fontSize="14px" fontFamily="yekan" display="inline">
                <FormattedMessage {...messages.already_have_account} />
              </Text>
              <Link to="/auth/login" color="#1652f0">
                <Box display="inline-block" color="#1652f0"><FormattedMessage {...messages.login} /></Box>
              </Link>
            </Box>
          </Box>
        </Box>
        <br />
      </Box>
    </>
  );
};

export default Register;
