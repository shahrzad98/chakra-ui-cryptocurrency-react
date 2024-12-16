/**
 *
 * AuthBaseInformationForm
 *
 */

import React, { useEffect, useState } from 'react';

import messages from '../../containers/Auth/UserAuthorize/messages';
import { FormattedMessage } from 'react-intl';
import { Box, Stack, Text, Input, Flex, Button, Link, useToast } from '@chakra-ui/react';
import Select from '../MaterialSelect';
import { api } from '../../utils/network';
import { GetURL } from '../../utils/urlMap';
import Joi from 'joi';
import moment from 'moment-jalaali';
import { range } from 'lodash';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function AuthBaseInformationForm({ onNextStep, currentStep, status, onclose }) {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const year = range(moment().locale('fa').format('YYYY') - 97, moment().locale('fa').format('YYYY') - 17);
  const day = range(1, 32);
  const [form, setForm] = useState({
    national_id: '',
    booklet_id: '',
    birthdate_year: '',
    birthdate_month: '',
    birthdate_day: '',
    postal_code: '',
    email: '',
    field: '',
    middle_name: '',
  });
  const [setAdvertisementChannels] = useState([]);
  const [setAssets] = useState([]);

  const [detail, setDetail] = useState();
  const [postalCodeDir, setPostalCodeDir] = useState(false);

  useEffect(() => {
    api.get(GetURL('advertisement-channels')).then(response => {
      setAdvertisementChannels(response?.data);
    });

    api.get(GetURL('exchange-asset')).then(response => {
      setAssets(response?.data);
    });

    // get user info
    api.get(GetURL('auth-step-three')).then(response => {
      if (response?.data != null) setForm(response?.data.base_info_batch_data);
    });
  }, []);

  const handleNumber = evt => {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
    return false;
  };

  const submit = () => {
    api
      .put(GetURL('kyc-base-info'), {
        ...form,
        // eslint-disable-next-line no-bitwise
        birthdate_year: parseInt(form.birthdate_year, 10),
        // eslint-disable-next-line no-bitwise
        birthdate_day: parseInt(form.birthdate_day, 10),
        // eslint-disable-next-line no-bitwise
        birthdate_month: parseInt(form.birthdate_month, 10),
      })
      .then(() => {
        toastIdRef.current = toast({
          description: 'اطلاعات با موفقیت ثبت شد',
          status: 'success',
        });
        onNextStep(currentStep + 1);
      })
      .catch(err => {
        if (err?.data?.error?.code == '-1114') {
          document.getElementById('email').style.border = '1px solid #f4c622 !important';
          document.getElementById('email').style.borderColor = '#f4c622';
          setDetail('emailSubmit');
        }
        if (err?.data?.error?.message != null && err?.data?.error?.message != '')
          toastIdRef.current = toast({
            description: err?.data?.error?.message,
            status: 'error',
          });
      });
  };
  const schema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    national_id: Joi.string().required().min(10).max(10).label('national_id'),
    booklet_id: Joi.string().min(1).required().label('booklet_id'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('email'),
    father_name: Joi.allow('').label('father_name'),
    advertisement_channel: Joi.allow('').label('advertisement_channel'),
    advertisement_comment: Joi.allow('').label('advertisement_comment'),
    buy_exchange_asset: Joi.allow('').label('buy_exchange_asset'),
    address: Joi.allow('').label('address'),
    state: Joi.allow('').label('state'),
    birthdate_year: Joi.allow(''),
    birthdate_month: Joi.allow(''),
    birthdate_day: Joi.allow(''),
    postal_code: Joi.string().required().label('postal_code'),
    shahkar: Joi.allow(''),
    field: Joi.allow(''),
    middle_name: Joi.allow(''),
    verification_status: Joi.number().allow(0),
  });

  // eslint-disable-next-line consistent-return
  const validate = () => {
    const result = schema.validate(form);
    if (result.error) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of result?.error?.details) {
        const path = item?.path.join('_');
        console.log(path);
        // document.getElementById(path).style.border = '1px solid #f4c622 !important';
        // document.getElementById(path).style.borderColor = '#f4c622';
        // setDetail(path);

        toastIdRef.current = toast({
          description: 'اطلاعات ثبت نشد',
          status: 'error',
        });
      }

      return result.error;
    }

    submit();
  };

  const handleTextChange = (e, field, len, slice) => {
    if (e.length >= len || typeof e === 'number') {
      if (!typeof e == 'number') e = e.slice(0, slice);
      document.getElementById(field).style.border = '1px solid #cbd5e0 !important';
      document.getElementById(field).style.borderColor = '#cbd5e0';

      setDetail('');
    } else {
      document.getElementById(field).style.border = '1px solid #f4c622 !important';
      document.getElementById(field).style.borderColor = '#f4c622';
      setDetail(field);
    }
    setForm({ ...form, [field]: e });
  };

  return (
    <>
      <Stack
        bg="white"
        rounded="md"
        // padding={{base:"0 20px 44px 0",xl:"0 32px 44px 32px"}}
        boxShadow="base"
        w={{
          base: '94%',

          xl: '480px',
        }}
        margin="0 auto"
      >
        <Box margin={{ xl: '12px auto', base: '17px auto 13px auto' }} w="100%" textAlign="center">
          <Text display="inline-block" fontSize={{ base: '10px', xl: '16px' }} color="#050f19">
            <FormattedMessage {...messages.trade_caution_message} />
          </Text>
          <br />
          <Link
            display="inline-block"
            color="#1652f0"
            fontSize={{ base: '12px', xl: '16px' }}
            target="_blank"
            href="https://rabex.ir/terms/"
          >
            قوانین و مقررات
          </Link>
        </Box>

        <Box padding={{ base: '0', xl: '0 44px 0 44px' }} marginTop="0 !important">
          <Box borderBottom="1px solid #eee" />
        </Box>

        <Stack
          padding={{ base: '20px 30px 16px 30px', xl: '12px 32px 16px 32px' }}
          direction={{
            base: ['column', 'column'],
            xl: ['column', 'row'],
            lg: ['column', 'row'],
            md: ['column', 'row'],
          }}
          marginTop="0 !important"
        >
          <Stack w={{ xl: '100%', md: '100%', base: '100%' }}>
            <Box w={['base', 'sm', '100%']}>
              <Box fontSize="15px" textAlign="right" width="100%">
                <Text fontFamily="yekan" color="#050f19" fontSize={{ base: '13px', xl: '16px' }}>
                  <FormattedMessage {...messages.national_id} />
                </Text>
              </Box>
              <Input
                type="number"
                bg="gray.80"
                fontFamily="yekan"
                borderRadius="2px"
                marginTop="6px"
                dir="ltr"
                w={{ base: '100%', xl: '100%' }}
                height={{ base: '50px', xl: '60px' }}
                fontSize={{ base: '12px', xl: '16px' }}
                id="national_id"
                maxLength="10"
                border={detail === 'national_id' ? '1px solid #f4c622' : '1px solid #cbd5e0'}
                defaultValue={form.national_id}
                onChange={e => handleTextChange(e.target.value, 'national_id', 10, 10)}
              />
              <Text
                display={detail === 'national_id' ? 'block' : 'none'}
                marginTop="5px"
                fontFamily="yekan"
                color="#f4c622"
                fontSize={{ base: '9px', xl: '16px' }}
                textAlign="right"
              >
                کدملی باید ۱۰ رقم باشد
              </Text>
            </Box>

            <Box w={['base', 'sm', '100%']}>
              <Box textAlign="right" width="100%">
                <Text fontFamily="yekan" color="#050f19" fontSize={{ base: '13px', xl: '16px' }}>
                  <FormattedMessage {...messages.booklet_id} />
                </Text>
              </Box>
              <Input
                type="number"
                bg="gray.80"
                marginTop="6px"
                fontSize={{ base: '12px', xl: '16px' }}
                w={{ base: '100%', xl: '100%' }}
                height={{ base: '50px', xl: '60px' }}
                fontFamily="yekan"
                dir="ltr"
                color="#050f19"
                borderRadius="2px"
                id="booklet_id"
                maxLength="10"
                border={detail === 'booklet_id' ? '1px solid #f4c622' : '1px solid #cbd5e0'}
                defaultValue={form.booklet_id}
                onChange={e => handleTextChange(e.target.value, 'booklet_id', 1, 10)}
              />
              <Text
                display={detail === 'booklet_id' ? 'block' : 'none'}
                marginTop="5px"
                fontFamily="yekan"
                color="#f4c622"
                fontSize={{ base: '9px', xl: '16px' }}
                textAlign="right"
              >
                شماره شناسنامه نمی تواند خالی باشد
              </Text>
            </Box>

            <Box w={['base', 'sm', '50%']}>
              <Box textAlign="right" width="100%" marginTop={{ base: '11px', xl: '7px' }}>
                <Text fontFamily="yekan" color="#050f19" fontSize={{ base: '13px', xl: '16px' }}>
                  <FormattedMessage {...messages.email} />
                </Text>
              </Box>

              <Input
                bg="gray.80"
                border="1px"
                marginTop="6px"
                fontSize={{ base: '12px', xl: '16px' }}
                id="email"
                w={{ base: '100%', xl: '415px', lg: '183px' }}
                height={{ base: '50px', xl: '65px' }}
                dir="ltr"
                fontFamily="yekan"
                borderRadius="2px"
                defaultValue={form.email}
                onChange={
                  e =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    handleTextChange(e.target.value, 'email', 4, 200)
                  // eslint-disable-next-line prettier/prettier
                }
              />
              <Text
                display={detail === 'email' ? 'block' : 'none'}
                marginTop="4px"
                fontFamily="yekan"
                color="#f4c622"
                fontSize={{ base: '9px', xl: '16px' }}
                textAlign="right"
              >
                ایمیل معتبر نیست
              </Text>
              <Text
                display={detail === 'emailSubmit' ? 'block' : 'none'}
                marginTop="4px"
                fontFamily="yekan"
                color="#f4c622"
                fontSize={{ base: '9px', xl: '16px' }}
                textAlign="right"
              >
                ایمیل قبلا ثبت شده است
              </Text>
            </Box>

            <Box textAlign="right">
              <Text
                marginTop={{ base: '11px', xl: '18px' }}
                fontSize={{ base: '13px', xl: '16px' }}
                color="#050f19"
                fontFamily="yekan"
              >
                <FormattedMessage {...messages.DatePicker} />
              </Text>
            </Box>
            <Flex display="flex" alignItems="center">
              <Select
                bg="white"
                color="#050f19"
                icon=""
                width={{ base: '61px', xl: '95px' }}
                fontSize={{ base: '12px', xl: '16px' }}
                height={{ base: '45px', xl: '65px' }}
                marginTop="6px"
                borderRadius="2px"
                id="birthdate_year"
                border={detail === 'birthdate_year' ? '1px solid #f4c622' : '1px solid #cbd5e0'}
                fontFamily="yekan"
                value={form?.birthdate_year}
                onChange={e => setForm({ ...form, birthdate_year: parseInt(e.target.value) })}
              >
                <option>سال</option>
                {year.map(value => (
                  <option value={value}>{value}</option>
                ))}
              </Select>

              <Select
                bg="white"
                color="#050f19"
                fontFamily="yekan"
                width={{ base: '61px', xl: '95px' }}
                fontSize={{ base: '12px', xl: '16px' }}
                height={{ base: '45px', xl: '65px' }}
                borderRadius="2px"
                padding="0"
                id="birthdate_month"
                icon=""
                marginTop="6px"
                value={form?.birthdate_month}
                onChange={e => setForm({ ...form, birthdate_month: parseInt(e.target.value) })}
              >
                <option>ماه</option>

                <FormattedMessage {...messages.farvardin}>{msg => <option value="1">{msg}</option>}</FormattedMessage>
                <option value="2">اردیبهشت</option>
                <option value="3">خرداد</option>
                <option value="4">تیر</option>
                <option value="5">مرداد</option>
                <option value="6">شهریور</option>
                <option value="7">مهر</option>
                <option value="8">آبان</option>
                <option value="9">آذر</option>
                <option value="10">دی</option>
                <option value="11">بهمن</option>
                <option value="12">اسفند</option>
              </Select>

              <Select
                bg="white"
                icon=""
                width={{ base: '61px', xl: '95px' }}
                fontSize={{ base: '12px', xl: '16px' }}
                height={{ base: '45px', xl: '65px' }}
                marginTop="6px"
                color="#050f19"
                borderRadius="2px"
                fontFamily="yekan"
                id="birthdate_day"
                value={form?.birthdate_day}
                onChange={e => setForm({ ...form, birthdate_day: parseInt(e.target.value) })}
              >
                <option>روز</option>

                {day.map(value => (
                  <option value={value}>{value}</option>
                ))}
              </Select>

              <Box fontSize="15px" w={['base', 'sm', '40%']} />
            </Flex>
            <Stack direction={['column', 'row']} spacing="20px" align="top">
              <Box w={['base', 'sm', '100%']}>
                <Box fontSize="15px" textAlign="right" width="100%">
                  <Text
                    color="#050f19"
                    marginTop={{ base: '11px', xl: '16px' }}
                    fontSize={{ base: '13px', xl: '16px' }}
                    fontFamily="yekan"
                  >
                    <FormattedMessage {...messages.ZipCode} />
                  </Text>
                </Box>

                {/* <Select2
                  options={options}
                  id="state"
                  border={detail === 'state' ? '1px solid #f4c622' : '1px solid #cbd5e0'}
                  fontFamily="yekan"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  color="#050f19"
                  fontSize="16px"
                  value={options?.filter(option => (form?.state ? option.label === form?.state : ''))}
                  styles={customStyles}
                  placeholder="استان خود را انتخاب نمایید"
                  onChange={e => {
                    setForm({ ...form, state: e.value });
                    handleTextChange(e.value, 'state', 1, 200);
                  }}
                /> */}
              </Box>
            </Stack>

            <Stack direction={['column', 'row']} spacing="20px" align="top">
              <Box w={['base', 'sm', '100%']}>
                <Input
                  type="text"
                  maxLength="10px"
                  bg="gray.80"
                  id="postal_code"
                  fontFamily="yekan"
                  border="1px"
                  marginTop="6px"
                  width={{ base: '100%', xl: '100%' }}
                  height={{ base: '45px', xl: '65px' }}
                  color="#050f19"
                  onFocus={() => {
                    setPostalCodeDir(true);
                  }}
                  onBlur={() => {
                    setPostalCodeDir(false);
                  }}
                  fontSize={{ base: '12px', xl: '16px' }}
                  dir={postalCodeDir ? 'ltr' : 'rtl'}
                  borderRadius="2px"
                  placeholder="کد پستی"
                  defaultValue={form.postal_code}
                  onKeyPress={e => {
                    handleNumber(e);
                  }}
                  onChange={e => handleTextChange(e.target.value, 'postal_code', 10, 10)}
                />
                <Text
                  display={detail === 'postal_code' ? 'block' : 'none'}
                  marginTop="4px"
                  fontFamily="yekan"
                  color="#f4c622"
                  fontSize={{ base: '9px', xl: '16px' }}
                  textAlign="right"
                >
                  کد پستی باید ده رقم باشد
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Box marginTop="0 !important" padding={{ base: '0 30px 0 30px', xl: '0 32px 0 32px' }}>
          <Box borderBottom="1px solid #eee" />
        </Box>

        <Box dir="ltr" textAlign={{ base: 'center', xl: 'left' }} marginTop="16px !important">
          <Button
            display={status === 'send' ? { base: 'inline-block', xl: 'flex' } : 'none'}
            height={{ xl: '60px', base: '47px' }}
            bg="#1652F0"
            fontSize={{ base: '12px', xl: '22px' }}
            borderRadius="3px"
            marginBottom={{ base: '23px', xl: '26px' }}
            marginLeft={{ base: '0', xl: '32px' }}
            textAlign="center"
            color="white"
            width={{ base: '263px', xl: '420px' }}
            _hover={{
              background: '#1652F0',
            }}
            _active={{
              background: '#1652F0',
            }}
            onClick={() => {
              validate();
            }}
          >
            <FormattedMessage {...messages.proceed} />
          </Button>

          <Flex display={onclose ? 'flex' : 'none'} marginBottom="20px" marginLeft="20px">
            <Button
              height="60px"
              bg="#1652F0"
              fontSize="14px"
              textAlign="center"
              color="white"
              width="100px"
              marginRight="20px"
              borderRadius="4px"
              onClick={onclose}
              _hover={{ background: '#1652F0' }}
              _active={{ background: '#1652F0' }}
            >
              <FormattedMessage {...messages.close} />
            </Button>

            <Button
              height="60px"
              bg="#708599"
              fontSize="14px"
              textAlign="center"
              color="white"
              width="100px"
              _hover={{ background: '#708599' }}
              _active={{ background: '#708599' }}
              onClick={() => {
                validate();
              }}
            >
              <FormattedMessage {...messages.savechangefield} />
            </Button>
          </Flex>
        </Box>
      </Stack>
    </>
  );
}

export default AuthBaseInformationForm;
