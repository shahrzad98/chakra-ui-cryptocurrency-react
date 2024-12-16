import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { api } from 'utils/network';
import { GetURL } from 'utils/urlMap';
import { useHistory } from 'react-router-dom';
import { LanguageTools } from '../../../utils/languageTools';
import Header from '../Header/header';
import { Box, Input, Flex, Text, Link, Button } from '@chakra-ui/react';
import TokenManager from '../../../utils/TokenManager';
import Joi from 'joi';
import styled from 'styled-components';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const history = useHistory();
  const language = LanguageTools();
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessages, setError] = useState('');
  const err = {};
  const schema = Joi.object({
    username: Joi.string().required().min(11).messages({
      'string.empty': 'شماره همراه نمی تواند خالی باشد.',
      'string.min': 'شماره همراه باید حداقل یازده رقم باشد.',
      'any.required': 'شماره همراه نمی تواند خالی باشد.',
    }),
    password: Joi.string().required().min(7).label('password').messages({
      'string.empty': 'کلمه عبور نمی تواند خالی باشد.',
      'string.min': 'کلمه عبور باید حداقل هفت رقم باشد.',
      'any.required': 'کلمه عبور نمی تواند خالی باشد.',
    }),
  });

  const handlePhoneNumber = evt => {
    evt = evt || window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
    return false;
  };

  // @ts-ignore

  const validate = () => {
    setIsLoading(true);
    const result = schema.validate(form);
    let errors = '';

    if (result.error) {
      for (const item of result?.error?.details) {
        const path = item?.path.join('_');

        err[path] = item?.message;

        errors += item?.message;
      }
      setError(errors);
      // toast.error(_error, {
      //   position: 'bottom-center',
      // });
      setIsLoading(false);
      return result.error;
    }
    // @ts-ignore
    api
      .post(GetURL('login'), {
        username: form.username,
        password: form.password,
      })
      .then(response => {
        setIsLoading(false);
        if (response.data) {
          setIsLogin(true);
          TokenManager.set(response.data);

          history.push('/auth/totp', {
            tasks: response?.data?.task_list,
          });
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(error?.data?.error?.message);
      });

    return true;
  };

  const ErrorBox = styled.div`
    padding: 20px 35px;
    background: rgba(255, 83, 83, 0.11);
    border: 1px solid #ff5353;
    color: #ff5353;
    text-align: center;
    font-size: 14px;
  `;
  let Error;
  if (errorMessages !== '') {
    Error = <ErrorBox>{errorMessages}</ErrorBox>;
  }

  return (
    <>
      <Box
        padding="0"
        position="relative"
        w="100%"
        onKeyDown={e => {
          // depraceated, needs an update
          if (e.charCode === 13 || e.keyCode === 13) {
            validate();
          }
        }}
        textAlign="center"
      >
        <Header />

        <Box
          w={{
            base: '92%',
            md: '60%',
            lg: '40%',
            xl: '480px',
          }}
          dir={language.Dir}
          boxShadow="0 5px 15px -2px rgb(0 0 0 / 20%)"
          borderRadius={{ base: '4px', md: '6px' }}
          className={language.Align}
          margin={{ base: '30px auto 0 auto', xl: '160px auto', md: '160px auto' }}
          background="#fff"
          onKeyDown={e => {
            if (e.charCode === 13 || e.keyCode === 13) {
              validate();
            }
          }}
        >
          <Box boxShadow="0 5px 15px -2px rgb(0 0 0 / 20%)" borderRadius={{ base: '0', md: '6px' }}>
            <Text
              textAlign="center"
              paddingTop={{ base: '25px', xl: '36px' }}
              margin={{ base: '0px  0 17px 0', xl: '0  0 20px 0' }}
              fontSize={{ base: '20px', xl: '26px' }}
              color="#050F19"
            >
              <FormattedMessage {...messages.LoginAccount} />
            </Text>

            {Error}

            <Box textAlign="right" height="30px" color="#fff" display={isLogin ? 'block' : 'none'} background="#81C784">
              <FormattedMessage {...messages.successlogin} />
            </Box>

            <Box borderBottom="1px solid #eceff1" />

            <Flex alignItems="center">
              <Text width="104px" marginRight="30px" fontSize={{ base: '14px', xl: '16px' }} color="#050F19">
                <FormattedMessage {...messages.mobile_label} />
              </Text>

              <Input
                type="text"
                maxLength={11}
                id="username"
                width="100%"
                textAlign="left"
                height={{ base: '58px', xl: '76px' }}
                dir="ltr"
                min="0"
                fontSize={{ base: '14px', xl: '19px' }}
                paddingLeft="30px"
                marginRight="30px"
                placeholder="09xxxxxxxxx"
                border="0"
                focusBorderColor="white"
                defaultValue={form.username}
                label={<FormattedMessage {...messages.username} />}
                onKeyPress={e => {
                  handlePhoneNumber(e);
                }}
                onChange={event => {
                  setForm({
                    ...form,
                    username: event.target.value.charAt(0) === '0' ? event.target.value : `0${event.target.value}`,
                  });
                }}
              />
            </Flex>

            <Box borderBottom="1px solid #eceff1" />

            <Flex alignItems="center">
              <Text width="84px" marginRight="30px" fontSize={{ base: '14px', xl: '16px' }} color="#050F19">
                <FormattedMessage {...messages.password_label} />
              </Text>

              <Input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                width="100%"
                textAlign="left"
                dir="ltr"
                fontSize={{ base: '14px', xl: '16px' }}
                height={{ base: '58px', xl: '76px' }}
                border="0"
                fontFamily="yekan"
                padding="0 6px"
                placeholder="حداقل 8 کاراکتر"
                focusBorderColor="white"
                label={<FormattedMessage {...messages.password} />}
                onChange={event => {
                  setForm({ ...form, password: event.target.value });
                }}
              />

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

            <Box borderBottom="1px solid #eceff1" />

            <Box marginTop="39px" padding="0 30px">
              <Button
                fontSize={{ base: '13px', xl: '20px' }}
                height="60px"
                width="100%"
                borderRadius="4px"
                background="#1652f0"
                _hover={{ background: '#1652f0' }}
                _active={{ background: '#1652f0' }}
                color="#fff"
                onClick={validate}
              >
                {isLoading ? (
                  <Box marginTop="8px">
                    <ScaleLoader height={20} color="#fff" />
                  </Box>
                ) : (
                  <Text>
                    <FormattedMessage {...messages.LoginAccount} />
                  </Text>
                )}
              </Button>
            </Box>

            <Box textAlign="center" marginTop="23px" paddingBottom="17px">
              <Text
                margin="0 4px"
                fontFamily="yekan"
                fontSize={{ base: '12px', xl: '14px' }}
                display="inline-block"
                color="#050F19"
              >
                <FormattedMessage {...messages.DonthaveaRabexaccount} />
              </Text>

              <Link
                color="#1652f0"
                role="button"
                fontSize={{ base: '12px', xl: '14px' }}
                onClick={() => history.push('/auth/register')}
              >
                <FormattedMessage {...messages.register} />
              </Link>

              <Link
                margin="7px 0"
                w="100%"
                fontSize={{ base: '12px', xl: '14px' }}
                display="block"
                color="#1652f0"
                onClick={() => history.push('/auth/login/forget')}
              >
                <FormattedMessage {...messages.forget_password} />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
