/**
 *
 * RememberPassword
 *
 */

import React, { useState } from 'react';
import { GetURL } from 'utils/urlMap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Box, Text, Input, Button, Flex } from '@chakra-ui/react';
import Header from '../../Header/header';
import { useHistory, Link } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import { api } from 'utils/network';
import { LanguageTools } from '../../../../utils/languageTools';
import Label from 'components/Label';
import Joi from 'joi';
import { toast } from 'react-toastify';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const RememberPassword = ({ dir }) => {
  const [form, setForm] = useState({
    cellphone: '',
    password: '',
    confirm_password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const err = {};

  const schema = Joi.object({
    cellphone: Joi.string()
      .regex(/((^([+]|0*)98)|(^0))?[9][0-9]{9}$/)
      .required()
      .label('cellphone')
      .messages({
        'string.empty': `شماره همراه نمی تواند خالی باشد.`,
        'string.min': `شماره همراه باید حداقل یازده رقم باشد.`,
        'any.required': `شماره همراه نمی تواند خالی باشد.`,
        'string.pattern.base': 'لطفا شماره همراه معتبر وارد نمایید',
      }),
    password: Joi.string().required().min(7).label('password').messages({
      'string.empty': `کلمه عبور نمی تواند خالی باشد.`,
      'string.min': `کلمه عبور باید حداقل هفت رقم باشد.`,
      'any.required': `کلمه عبور نمی تواند خالی باشد.`,
    }),
    confirm_password: Joi.allow(''),
  });

  const history = useHistory();
  const langauge = new LanguageTools();
  const DivBox = styled.div`
    padding: 10px 35px;
  `;
  const [errorMessages, setError] = useState('');

  const validate = () => {
    setIsLoading(true);
    if (form.password == form.confirm_password) {
      const result = schema.validate(form);
      let errorMessages = '';

      if (result.error) {
        for (let item of result?.error?.details) {
          const path = item?.path.join('_');

          err[path] = item?.message;

          errorMessages += item?.message;
        }
        setError(errorMessages);
        toast.error(errorMessages, {
          position: 'bottom-center',
        });
        setIsLoading(false);
        return result.error;
      }
      api
        .post(GetURL('reset-password'), {
          username: form.cellphone,
        })
        .then(response => {
          setIsLoading(false);
          history.push('/auth/totp/', {
            tasks: response?.data?.task_list,
            state: {
              historyUrl: 'changePassword',
              username: form.cellphone,
              password: form.password,
            },
          });
        })
        .catch(error => {
          setIsLoading(false);
          setError(error.data.error.message);
        });
    } else {
      setIsLoading(false);
      setError('کلمه عبور با تکرار آن برابر نیست');
    }
  };

  const [passwordShownOne, setPasswordShownOne] = useState(false);
  const [passwordShownTwo, setPasswordShownTwo] = useState(false);
  const togglePasswordVisiblityTwo = () => {
    setPasswordShownTwo(passwordShownTwo ? false : true);
  };
  const togglePasswordVisiblityOne = () => {
    setPasswordShownOne(passwordShownOne ? false : true);
  };

  const handlePhoneNumber = evt => {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  };

  const ErrorBox = styled.div`
    padding: 20px 35px;
    background: #f2dede;
    border: 1px solid #eed3d7;
    color: #c09853;
    direction: rtl;
    text-align: right;
  `;
  let Error;
  if (errorMessages != '') {
    Error = <ErrorBox>{errorMessages}</ErrorBox>;
  }

  return (
    <Box
      padding="0"
      position="relative"
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
        textAlign="right"
        margin={{ xl: '160px auto', md: '80px auto', base: '30px auto 0 auto' }}
        w={{ base: '96%', sm: '96%', md: '60%', lg: '40%', xl: '500px' }}
      >
        <Box bg="#fff" boxShadow="0 5px 15px -2px rgb(0 0 0 / 20%)" borderRadius={{ base: '4px', md: '6px' }} dir={dir}>
          <Text textAlign="center" padding={{xl:"36px 29px 0 29px",base:"25px 29px 0 29px"}} fontSize={{ base: '20px', xl: '28px' }} color="#050f19">
            {<FormattedMessage {...messages.forgetpassword} />}
          </Text>

          {Error}

          <Box padding="0 29px 22px 29px">
            <Label fontSize="13px" margin="21px 0 8px 0" color="#708599" text={<FormattedMessage {...messages.mobile_label} />} />
            <Input
              type="text"
              maxLength={11}
              name="cellphone"
              id="cellphone"
              border="1px solid #eceff1"
              height="50px"
              textAlign="left"
              dir="ltr"
              onKeyPress={e => {
                handlePhoneNumber(e);
              }}
              onChange={e => setForm({ ...form, cellphone: e.target.value })}
            />

            <Box position="relative">
              <Label
              fontSize="13px"
                margin="20px 0 8px 0"
                color="#708599"
                text={<FormattedMessage {...messages.choosenewpassword} />}
              />
              <Input
                type={passwordShownOne ? 'text' : 'password'}
                name="password"
                id="password"
                border="1px solid #eceff1"
                height="50px"
                textAlign="left"
                dir="ltr"
                onChange={event => setForm({ ...form, password: event.target.value })}
              />
              <Box position="absolute" right="10px" bottom="15px">
                {passwordShownOne ? (
                  <ViewIcon
                    position="relative"
                    zIndex="9"
                    cursor="pointer"
                    color="#A0AEC0"
                    onClick={togglePasswordVisiblityOne}
                    w={12}
                    h={5}
                  />
                ) : (
                  <ViewOffIcon
                    position="relative"
                    zIndex="9"
                    cursor="pointer"
                    color="#A0AEC0"
                    onClick={togglePasswordVisiblityOne}
                    w={12}
                    h={5}
                  />
                )}
              </Box>
            </Box>
            <Box position="relative">
              <Label fontSize="13px" margin="20px 0 8px 0" color="#708599" text={<FormattedMessage {...messages.Repeat_password} />} />
              <Input
                type={passwordShownTwo ? 'text' : 'password'}
                name="confirm_password"
                id="confirm_password"
                border="1px solid #eceff1"
                height="50px"
                textAlign="left"
                dir="ltr"
                onChange={event => setForm({ ...form, confirm_password: event.target.value })}
              />

              <Box position="absolute" right="10px" bottom="15px">
                {passwordShownTwo ? (
                  <ViewIcon
                    position="relative"
                    zIndex="9"
                    cursor="pointer"
                    color="#A0AEC0"
                    onClick={togglePasswordVisiblityTwo}
                    w={12}
                    h={5}
                  />
                ) : (
                  <ViewOffIcon
                    position="relative"
                    zIndex="9"
                    cursor="pointer"
                    color="#A0AEC0"
                    onClick={togglePasswordVisiblityTwo}
                    w={12}
                    h={5}
                  />
                )}
              </Box>
            </Box>
            <Button
              background="rgb(22, 82, 240)"
              _hover={{ background: 'rgb(22, 82, 240)' }}
              _active={{ background: 'rgb(22, 82, 240)' }}
              color="#fff"
              margin="19px auto 0 auto"
              borderRadius="4px;"
              w="100%"
              height="50px"
              fontSize={{xl:"18px",base:"13px"}}
              display="flex"
              onClick={e => {
                validate();
              }}
            >
              {isLoading ? (
                <Box marginTop="8px">
                  <ScaleLoader height={20} color={'#fff'} />
                </Box>
              ) : (
                <Text>{<FormattedMessage {...messages.changepassword} />}</Text>
              )}
            </Button>
          </Box>
          <Box paddingBottom="16px" textAlign="center">
            <Text fontSize={{base:"13px",xl:"14px"}} fontFamily="yekan" display="inline">
              <FormattedMessage {...messages.already_have_account} />
            </Text>
            <Link to="/auth/login" className="text-primary">
              <FormattedMessage {...messages.login} />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RememberPassword;
